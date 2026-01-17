import type { FluxContext } from '../../types';

const CURRICULUM_URL = 'https://raw.githubusercontent.com/IsraelAraujo70/curriculum/main/english.tex';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

// Cache do currículo para evitar múltiplas requisições
let curriculumCache: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

async function fetchCurriculum(): Promise<string> {
  // Retorna do cache se ainda válido
  if (curriculumCache && Date.now() - cacheTimestamp < CACHE_TTL) {
    return curriculumCache;
  }

  const headers: Record<string, string> = {};

  // Se tiver token do GitHub, usa para repos privados
  const githubToken = process.env.GITHUB_TOKEN;
  if (githubToken) {
    headers['Authorization'] = `token ${githubToken}`;
  }

  try {
    const response = await fetch(CURRICULUM_URL, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch curriculum: ${response.status}`);
    }

    curriculumCache = await response.text();
    cacheTimestamp = Date.now();

    return curriculumCache;
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    // Fallback para cache antigo se existir
    if (curriculumCache) {
      return curriculumCache;
    }
    throw error;
  }
}

// Datas de referência para cálculo de experiência
const CAREER_START_DATE = new Date('2023-06-01'); // Início como freelancer
const FORMAL_JOB_START_DATE = new Date('2025-01-01'); // Início emprego formal

function calculateExperience(startDate: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;

  if (years === 0) {
    return `${months} months`;
  } else if (months === 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  } else {
    return `${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`;
  }
}

function buildSystemPrompt(curriculum: string): string {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const totalExperience = calculateExperience(CAREER_START_DATE);
  const formalExperience = calculateExperience(FORMAL_JOB_START_DATE);

  return `You are an AI assistant representing Israel Araújo de Oliveira. You have access to his complete resume/CV below. Answer questions about his experience, skills, education, and projects in a helpful and professional manner.

Today is ${today}.

=== IMPORTANT CONTEXT ===
- Israel has ${totalExperience} of total experience as a developer
- He started as a freelancer in June 2023
- He began formal employment in January 2025 as a Junior Developer (${formalExperience} of formal experience)
=== END CONTEXT ===

When answering:
- Be concise but informative
- Highlight relevant experience and skills
- Be honest - if something isn't in the resume, say so
- Speak in first person when appropriate (e.g., "I have experience with...")
- Be friendly and professional

=== RESUME/CV (LaTeX format) ===
${curriculum}
=== END OF RESUME ===

Answer questions based on this resume. If asked about something not in the resume, politely indicate that information isn't available.`;
}

/**
 * Chat with Israel's curriculum using OpenRouter API.
 * Expects: { message: string, history?: ChatMessage[] }
 * Returns: { response: string }
 */
export default async function chat(ctx: FluxContext) {
  const { message, history = [] } = ctx.input;

  if (!message || typeof message !== 'string') {
    return {
      success: false,
      error: 'Message is required'
    };
  }

  const openrouterKey = process.env.OPENROUTER_API_KEY;
  if (!openrouterKey) {
    return {
      success: false,
      error: 'OpenRouter API key not configured'
    };
  }

  try {
    // Buscar currículo
    const curriculum = await fetchCurriculum();

    // Construir mensagens
    const messages: ChatMessage[] = [
      { role: 'system', content: buildSystemPrompt(curriculum) },
      ...history.slice(-10), // Últimas 10 mensagens do histórico
      { role: 'user', content: message }
    ];

    // Chamar OpenRouter
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouterKey}`,
        'HTTP-Referer': 'https://israel-portfolio.com',
        'X-Title': 'Israel Portfolio Chat'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json() as OpenRouterResponse;

    if (!response.ok || data.error) {
      console.error('OpenRouter error:', data.error);
      return {
        success: false,
        error: data.error?.message || 'Failed to get response from AI'
      };
    }

    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return {
        success: false,
        error: 'No response from AI'
      };
    }

    return {
      success: true,
      response: assistantMessage
    };

  } catch (error) {
    console.error('Chat error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal error'
    };
  }
}
