import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 72px;
  color: #e0aaff;
`;

const Message = styled.p`
  font-size: 24px;
  color: #333;
`;

const BackLink = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e0aaff;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #d09cd5;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Oops! The page you are looking for does not exist.</Message>
      <BackLink to="/">Go Back to Home</BackLink>
    </NotFoundContainer>
  );
};

export default NotFound;
