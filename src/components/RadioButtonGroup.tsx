import React from "react";
import styled from "styled-components";

import { RadioButtonGroupProps } from "../types/common";

const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    margin: 10px 0;
    gap: 20px;
    justify-content: start;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #a05dc8;
  }

  @media (max-width: 600px) {
    margin-right: 20px;
    font-size: 16px;
  }
`;

const RadioInput = styled.input`
  display: none;
`;

const CustomRadio = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid #a05dc8;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${({ checked }) => (checked ? "#a05dc8" : "transparent")};
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    border-color: #9b59b6;
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
    transform: translate(-50%, -50%)
      ${({ checked }) => (checked ? "scale(1)" : "scale(0)")};
    transition: transform 0.2s ease;
  }
`;

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  selected,
  onChange,
}) => {
  return (
    <RadioContainer>
      <Label>
        <RadioInput
          type="radio"
          value="cocktail"
          checked={selected === "cocktail"}
          onChange={() => onChange("cocktail")}
        />
        <CustomRadio checked={selected === "cocktail"} />
        Search by Cocktail Name
      </Label>
      <Label>
        <RadioInput
          type="radio"
          value="ingredient"
          checked={selected === "ingredient"}
          onChange={() => onChange("ingredient")}
        />
        <CustomRadio checked={selected === "ingredient"} />
        Search by Ingredient Name
      </Label>
    </RadioContainer>
  );
};

export default RadioButtonGroup;
