'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 2rem;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const projects = [
  {
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com React, Next.js e Stripe para pagamentos.",
    tech: ["React", "Next.js", "TypeScript", "Stripe", "Prisma"]
  },
  {
    title: "Task Management App",
    description: "Aplicativo de gerenciamento de tarefas com drag-and-drop e colaboração em tempo real.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"]
  },
  {
    title: "Weather Dashboard",
    description: "Dashboard meteorológico com visualizações interativas e previsões precisas.",
    tech: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"]
  },
  {
    title: "Social Media Analytics",
    description: "Ferramenta de análise de redes sociais com métricas avançadas e relatórios.",
    tech: ["React", "Python", "FastAPI", "PostgreSQL"]
  }
];

const ProjectsSection = () => {
  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Meus Projetos</Title>
      </motion.div>
      
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.tech.map((tech, techIndex) => (
                <TechTag key={techIndex}>{tech}</TechTag>
              ))}
            </TechStack>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </SectionContainer>
  );
};

export default ProjectsSection;