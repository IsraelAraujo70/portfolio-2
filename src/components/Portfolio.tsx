'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFullpage from '@fullpage/react-fullpage';

import { useIsMobile } from '../hooks/useMediaQuery';
import SectionIndicators from './SectionIndicators';
import HomeSection from './sections/HomeSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import ChatSection from './sections/ChatSection';

const PortfolioContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: ${props => props.$isMobile ? 'auto' : '100vh'};
  overflow: ${props => props.$isMobile ? 'auto' : 'hidden'};
`;

const MobileContainer = styled.div`
  width: 100%;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  margin-bottom: 2rem;
`;

interface PortfolioProps {}

const Portfolio: React.FC<PortfolioProps> = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const fullpageApi = useRef<any>(null);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const onLeave = useCallback((origin: any, destination: any) => {
    setCurrentSection(destination.index);
  }, []);

  const handleSectionClick = useCallback((sectionIndex: number) => {
    if (fullpageApi.current && !isMobile) {
      fullpageApi.current.moveTo(sectionIndex + 1);
    }
  }, [isMobile]);

  const sections = [
    <HomeSection key="home" />,
    <ProjectsSection key="projects" />,
    <ContactSection key="contact" />,
    <ChatSection key="chat" />
  ];

  if (isMobile) {
    return (
      <PortfolioContainer $isMobile={true}>
        <AnimatePresence>
          {isLoading && (
            <LoadingScreen
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ textAlign: 'center' }}>
                <LoadingSpinner
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <div>Carregando Portfólio...</div>
              </div>
            </LoadingScreen>
          )}
        </AnimatePresence>
        
        <MobileContainer>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              {section}
            </motion.div>
          ))}
        </MobileContainer>
      </PortfolioContainer>
    );
  }

  return (
    <PortfolioContainer $isMobile={false}>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ textAlign: 'center' }}>
              <LoadingSpinner
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <div>Carregando Portfólio...</div>
            </div>
          </LoadingScreen>
        )}
      </AnimatePresence>

      <SectionIndicators
        currentSection={currentSection}
        onSectionClick={handleSectionClick}
        isMobile={isMobile}
      />

      <ReactFullpage
        // fullpage.js options
        licenseKey={'YOUR_LICENSE_KEY'} // Para uso comercial, obtenha uma licença
        credits={{ enabled: false }}
        scrollingSpeed={1000}
        controlArrows={false}
        navigation={false}
        anchors={['home', 'projects', 'contact', 'chat']}
        sectionsColor={['transparent', 'transparent', 'transparent', 'transparent']}
        keyboardScrolling={true}
        touchSensitivity={15}
        normalScrollElementTouchThreshold={5}
        scrollBar={false}
        autoScrolling={true}
        fitToSection={true}
        fitToSectionDelay={1000}
        scrollHorizontally={false}
        continuousVertical={false}
        continuousHorizontal={false}
        scrollOverflow={false}
        responsiveWidth={1024}
        responsiveHeight={0}
        responsiveSlides={false}
        
        // Events
        onLeave={onLeave}
        afterLoad={(origin: any, destination: any) => {
          fullpageApi.current = destination.fullpageApi;
        }}
        
        render={({ state, fullpageApi: api }) => {
          fullpageApi.current = api;
          
          return (
            <ReactFullpage.Wrapper>
              {sections.map((section, index) => (
                <div key={index} className="section">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {section}
                  </motion.div>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </PortfolioContainer>
  );
};

export default Portfolio;