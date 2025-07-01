'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const IndicatorsContainer = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: ${props => props.$isMobile ? 'none' : 'flex'};
  flex-direction: column;
  gap: 1rem;
`;

const Indicator = styled(motion.div)<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#667eea' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$isActive ? '#667eea' : 'rgba(255, 255, 255, 0.8)'};
  
  &:hover {
    transform: scale(1.2);
    background: ${props => props.$isActive ? '#5a67d8' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const SectionLabel = styled(motion.div)<{ $isActive: boolean }>`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
`;

const IndicatorWrapper = styled.div`
  position: relative;
  
  &:hover ${SectionLabel} {
    opacity: 1;
  }
`;

interface SectionIndicatorsProps {
  currentSection: number;
  onSectionClick: (index: number) => void;
  isMobile: boolean;
}

const sections = [
  { name: 'Home', icon: '🏠' },
  { name: 'Projetos', icon: '💼' },
  { name: 'Contato', icon: '📧' },
  { name: 'Chat IA', icon: '🤖' }
];

const SectionIndicators: React.FC<SectionIndicatorsProps> = ({
  currentSection,
  onSectionClick,
  isMobile
}) => {
  return (
    <IndicatorsContainer $isMobile={isMobile}>
      {sections.map((section, index) => (
        <IndicatorWrapper key={index}>
          <Indicator
            $isActive={currentSection === index}
            onClick={() => onSectionClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
          <SectionLabel $isActive={currentSection === index}>
            {section.icon} {section.name}
          </SectionLabel>
        </IndicatorWrapper>
      ))}
    </IndicatorsContainer>
  );
};

export default SectionIndicators;