'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';

const SectionContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const ChatContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled(motion.div)<{ isUser: boolean }>`
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? '#667eea' : '#f1f1f1'};
  color: ${props => props.isUser ? 'white' : '#333'};
  padding: 1rem 1.5rem;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
`;

const ChatInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 25px;
  outline: none;
  font-size: 1rem;
  
  &:focus {
    border-color: #667eea;
  }
`;

const SendButton = styled(motion.button)`
  padding: 1rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SuggestionButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
  }
`;

const TypingIndicator = styled(motion.div)`
  align-self: flex-start;
  background: #f1f1f1;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const TypingDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
`;

interface MessageType {
  id: number;
  text: string;
  isUser: boolean;
}

const suggestedQuestions = [
  "Quais são suas especialidades?",
  "Como posso entrar em contato?",
  "Conte sobre seus projetos",
  "Qual sua experiência?"
];

const responses = {
  "especialidades": "Sou especializado em desenvolvimento Full Stack com React, Next.js, TypeScript, Node.js e bancos de dados como PostgreSQL e MongoDB.",
  "contato": "Você pode me contatar pelo email seu.email@exemplo.com ou pelo telefone +55 (11) 99999-9999. Também estou disponível no LinkedIn!",
  "projetos": "Desenvolvi projetos como plataformas de e-commerce, sistemas de gerenciamento de tarefas, dashboards analíticos e ferramentas de produtividade.",
  "experiência": "Tenho mais de 5 anos de experiência em desenvolvimento web, trabalhando com startups e empresas de médio porte.",
  "default": "Obrigado pela sua pergunta! Sou um desenvolvedor apaixonado por criar soluções digitais inovadoras. Como posso ajudá-lo hoje?"
};

const ChatSection = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, text: "Olá! Eu sou o assistente IA do portfólio. Como posso ajudá-lo?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('especialidade') || lowerQuestion.includes('tecnologia')) {
      return responses.especialidades;
    } else if (lowerQuestion.includes('contato') || lowerQuestion.includes('email')) {
      return responses.contato;
    } else if (lowerQuestion.includes('projeto')) {
      return responses.projetos;
    } else if (lowerQuestion.includes('experiência') || lowerQuestion.includes('experiencia')) {
      return responses.experiência;
    } else {
      return responses.default;
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: MessageType = {
      id: Date.now(),
      text: text,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay da IA
    setTimeout(() => {
      const aiResponse: MessageType = {
        id: Date.now() + 1,
        text: getResponse(text),
        isUser: false
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Chat com IA</Title>
      </motion.div>
      
      <ChatContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SuggestedQuestions>
          {suggestedQuestions.map((question, index) => (
            <SuggestionButton
              key={index}
              onClick={() => handleSuggestionClick(question)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question}
            </SuggestionButton>
          ))}
        </SuggestedQuestions>
        
        <MessagesContainer>
          {messages.map((message) => (
            <Message
              key={message.id}
              isUser={message.isUser}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </Message>
          ))}
          
          {isTyping && (
            <TypingIndicator
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TypingDot
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              />
              <TypingDot
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              />
              <TypingDot
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              />
            </TypingIndicator>
          )}
        </MessagesContainer>
        
        <form onSubmit={handleSubmit}>
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua pergunta..."
              disabled={isTyping}
            />
            <SendButton
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar
            </SendButton>
          </ChatInputContainer>
        </form>
      </ChatContainer>
    </SectionContainer>
  );
};

export default ChatSection;