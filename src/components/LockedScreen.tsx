import React from "react";
import styled from "styled-components";

const LockedScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  text-align: center;
  padding: 0px 10px;
  width: 100%;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
  }
`;
const LockedScreen: React.FC = () => {
  return (
    <LockedScreenWrapper>
      <h2>🔒 Unlock Cocktail App</h2>
      <p>Please connect your wallet to access the cocktail features.</p>
    </LockedScreenWrapper>
  );
};

export default LockedScreen;
