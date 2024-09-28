import React from "react";
import styled, { keyframes } from "styled-components";

const fillAnimation = keyframes`
  0% {
    height: 0%;
  }
  50% {
    height: 80%;
  }
  100% {
    height: 0%;
`;

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-50px) translateX(-10px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) translateX(10px);
    opacity: 0;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Glass = styled.div`
  position: relative;
  width: 100px;
  height: 200px;
  border: 5px solid #a05dc8;
  border-radius: 10px 10px 0 0;
  background-color: transparent;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const Liquid = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #9b59b6, #a05dc8);
  animation: ${fillAnimation} 1.5s infinite;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

const Bubble = styled.div<{ $delay: string }>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  animation: ${bubbleAnimation} 1.2s infinite;
  animation-delay: ${({ $delay }) => $delay};
`;

const Loader: React.FC = () => {
  const bubbles = Array.from({ length: 5 }, (_, index) => ({
    delay: `${index * 0.2}s`,
  }));

  return (
    <LoaderWrapper>
      <Glass>
        <Liquid>
          {bubbles.map((bubble, index) => (
            <Bubble key={index} $delay={bubble.delay} />
          ))}
        </Liquid>
      </Glass>
    </LoaderWrapper>
  );
};

export default Loader;
