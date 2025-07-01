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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 2rem;
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1000px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const ContactText = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    opacity: 0.9;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 120px;
  resize: vertical;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aqui você implementaria o envio do formulário
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Entre em Contato</Title>
      </motion.div>
      
      <ContactContainer>
        <ContactInfo>
          <ContactItem
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactIcon>📧</ContactIcon>
            <ContactText>
              <h3>Email</h3>
              <p>seu.email@exemplo.com</p>
            </ContactText>
          </ContactItem>
          
          <ContactItem
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactIcon>📱</ContactIcon>
            <ContactText>
              <h3>Telefone</h3>
              <p>+55 (11) 99999-9999</p>
            </ContactText>
          </ContactItem>
          
          <ContactItem
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ContactIcon>📍</ContactIcon>
            <ContactText>
              <h3>Localização</h3>
              <p>São Paulo, Brasil</p>
            </ContactText>
          </ContactItem>
        </ContactInfo>
        
        <ContactForm
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Mensagem</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Sua mensagem..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enviar Mensagem
          </SubmitButton>
        </ContactForm>
      </ContactContainer>
    </SectionContainer>
  );
};

export default ContactSection;