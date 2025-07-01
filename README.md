# Portfólio com Full Page Scroll

Um portfólio moderno e interativo implementado com **full page scroll** para desktop e scroll tradicional para dispositivos móveis.

## 🚀 Funcionalidades

### ✨ Full Page Scroll (Desktop)
- **Navegação por seções**: Sistema de scroll de página inteira usando `@fullpage/react-fullpage`
- **Indicadores laterais**: Navegação visual na lateral direita com ícones e labels
- **Animações suaves**: Transições fluidas entre seções usando Framer Motion
- **Detecção automática**: Ativa automaticamente apenas em telas desktop (>1024px)

### 📱 Responsivo (Mobile/Tablet)
- **Scroll tradicional**: Navegação normal por scroll em dispositivos móveis
- **Animações em viewport**: Seções animam conforme entram na visualização
- **Layout otimizado**: Interface adaptada para telas menores

### 🎨 Seções Implementadas

1. **🏠 Home**
   - Apresentação principal com gradiente
   - Animações escalonadas de entrada
   - Tipografia responsiva

2. **💼 Projetos**
   - Grid responsivo de projetos
   - Cards com efeito glassmorphism
   - Tags de tecnologias utilizadas
   - Animações hover interativas

3. **📧 Contato**
   - Informações de contato com ícones
   - Formulário funcional estilizado
   - Layout em duas colunas (desktop)
   - Validação de campos

4. **🤖 Chat IA**
   - Interface de chat interativa
   - Perguntas sugeridas rápidas
   - Indicador de digitação animado
   - Respostas contextuais simuladas

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Styled Components** - CSS-in-JS para estilização
- **Framer Motion** - Biblioteca de animações
- **@fullpage/react-fullpage** - Sistema de full page scroll
- **React Hooks personalizados** - Detecção de dispositivos móveis

## 📋 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal com providers
│   ├── page.tsx           # Página inicial
│   ├── registry.tsx       # Registry do Styled Components
│   └── globals.css        # Estilos globais
├── components/
│   ├── Portfolio.tsx      # Componente principal
│   ├── SectionIndicators.tsx # Indicadores de navegação
│   └── sections/
│       ├── HomeSection.tsx
│       ├── ProjectsSection.tsx
│       ├── ContactSection.tsx
│       └── ChatSection.tsx
└── hooks/
    └── useMediaQuery.ts   # Hook para detecção mobile
```

## ⚙️ Configuração e Uso

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
npm start
```

## 🎯 Funcionalidades Detalhadas

### Desktop (>1024px)
- **Full page scroll ativo**: Navegação por scroll de página inteira
- **Indicadores laterais**: Pontos de navegação na lateral direita
- **Atalhos de teclado**: Navegação com setas do teclado
- **Velocidade personalizada**: Transições de 1000ms entre seções

### Mobile/Tablet (≤1024px)
- **Scroll normal**: Navegação tradicional por scroll
- **Animações em viewport**: Elementos animam ao entrar na tela
- **Layout stack**: Seções empilhadas verticalmente
- **Performance otimizada**: Sem overhead da biblioteca fullpage

### Animações
- **Fade + Slide**: Elementos entram com opacidade e movimento
- **Escalonamento**: Delays progressivos para criar ritmo
- **Hover effects**: Interações responsivas em cards e botões
- **Loading screen**: Tela de carregamento com spinner animado

### Personalização
- **Cores e gradientes**: Cada seção tem seu próprio esquema visual
- **Tipografia responsiva**: Tamanhos de fonte adaptativos
- **Efeitos visuais**: Glassmorphism e backdrop-filter
- **Temas**: Fácil customização através do styled-components

## 🔧 Configuração Avançada

### Licença Fullpage.js
Para uso comercial, obtenha uma licença em [alvarotrigo.com/fullPage/](https://alvarotrigo.com/fullPage/) e substitua:
```tsx
licenseKey={'YOUR_LICENSE_KEY'}
```

### Customização de Seções
Adicione novas seções editando:
1. Array `sections` em `Portfolio.tsx`
2. Dados em `SectionIndicators.tsx`
3. Criar novo componente em `sections/`

### Breakpoints Responsivos
Modifique o hook `useMediaQuery.ts` para ajustar o ponto de corte:
```tsx
export const useIsMobile = () => {
  return useMediaQuery('(max-width: 1024px)'); // Altere aqui
};
```

## 📈 Performance

- **Code splitting**: Componentes carregados sob demanda
- **Otimização de imagens**: Next.js Image optimization
- **CSS otimizado**: Styled-components com SSR
- **Animações hardware-accelerated**: Uso de transform e opacity

## 🚀 Deploy

O projeto está configurado para deploy fácil em:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **GitHub Pages**
- **Qualquer hosting com Node.js**

---

**Desenvolvido com ❤️ usando tecnologias modernas para criar uma experiência única de navegação.**
