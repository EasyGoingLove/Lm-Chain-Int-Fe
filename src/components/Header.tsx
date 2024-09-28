import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";

import WalletConnect from "./WalletConnect";
import { useMode } from "../context/ModeContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #1e1e1e;
  color: white;
  position: sticky;
  box-shadow: 0px 0px 7px 3px #ffffff;
  top: 0;
  z-index: 100;

  @media (max-width: 769px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.div`
  h1 {
    font-size: 24px;
    color: #e0aaff;
    font-family: "Pacifico", cursive;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 20px;
  list-style-type: none;
  padding: 0px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #e0aaff;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const ModeButton = styled.button<{ mode: string | null }>`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  position: relative;
  border:1px solid white;
  padding:4px;

  &:hover {
    animation: ${pulseAnimation} 0.5s ease-in-out infinite;
  }

  &::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ mode }) =>
      mode === "blockchain" ? "blue" : "green"};
    margin-left: 10px;
  }
`;

const Header: React.FC = () => {
  const { mode, setMode } = useMode();

  const handleRemoveMode = () => {
    setMode(null);
  };

  return (
    <HeaderContainer>
      <Logo>
        <h1>Cocktail App</h1>
      </Logo>

      {mode && (
        <nav>
          <NavLinks>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          </NavLinks>
        </nav>
      )}

      {mode && (
        <>
          <ModeButton id="not-clickable" onClick={handleRemoveMode} mode={mode}>
            {mode.toUpperCase()}
          </ModeButton>
          <ReactTooltip
            anchorSelect="#not-clickable"
            place="bottom"
            content="Click to remove mode"
          />
        </>
      )}

      {mode === "blockchain" && <WalletConnect />}
    </HeaderContainer>
  );
};

export default Header;
