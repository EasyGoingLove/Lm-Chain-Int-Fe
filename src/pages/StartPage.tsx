import React from 'react';
import styled from 'styled-components';
import { useMode } from '../context/ModeContext';
import { Navigate, useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
  text-align: center;
  width:100%;
  overflow:hidden;
`;

const IntroText = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #f06, #ffb347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ModeButton = styled.button<{ isBlockchain?: boolean }>`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.isBlockchain ? "#00b894" : "#e17055")};
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
    props.isBlockchain ? "#00a676" : "#d35400"};
    transform: scale(1.05);
  }
`;

const FooterText = styled.p`
  margin-top: 50px;
  font-size: 0.9rem;
  color: #999;
`;

const StartPage: React.FC = () => {
  const { mode, setMode } = useMode();
  const navigate = useNavigate();

  const handleSetMode = (selectedMode: string) => {
    setMode(selectedMode);
    navigate('/home');
  };



  if (mode) {
    return <Navigate to='/home' />
  }

  return (
    <Container>

      <IntroText>Welcome to Cocktail World! 🍸</IntroText>
      <SubText>
        Dive into a refreshing journey of cocktails! Choose how you want to
        explore: from our database of delightful drinks, or through
        blockchain-backed cocktail creations.
      </SubText>
      <ButtonContainer>
        <ModeButton onClick={() => handleSetMode('api')}>API Mode</ModeButton>
        <ModeButton isBlockchain onClick={() => handleSetMode('blockchain')}>
          Blockchain Mode
        </ModeButton>
      </ButtonContainer>
      <FooterText>Choose your mode and explore unique cocktails!</FooterText>



    </Container>
  );
};

export default StartPage;
