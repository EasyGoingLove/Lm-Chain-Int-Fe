import React, { useState } from "react";
import styled from "styled-components"; // T

const CardWrapper = styled.div`
  width: 250px;
  height: 400px;
  perspective: 1000px;
`;

const Card = styled.div<{ $isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $isFlipped }) => ($isFlipped ? "rotateY(180deg)" : "none")};
`;

const CardFace = styled.div`
  position: absolute;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardFront = styled(CardFace)`
  background-color: white;
  text-align: center;

  &:hover {
    transform: rotateY(3deg) rotateX(3deg);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
`;

const CardBack = styled(CardFace)`
  background-color: #d8d9e7b5;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CocktailImage = styled.img<{ $isLoading: boolean }>`
  width: 100%;
  min-width: 230px;
  height: 230px;
  border-radius: 5px;
  display: ${({ $isLoading }: { $isLoading: boolean }) =>
    $isLoading ? "none" : "block"};
`;

const Placeholder = styled.div`
  width: 230px;
  height: 230px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #999;
  font-size: 16px;
`;

const HeartIcon = styled.div<{ $isFavorite: boolean }>`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index:9999;
  pointer-events: auto;

  svg {
    width: 24px;
    height: 24px;
    fill: ${({ $isFavorite }) => ($isFavorite ? "red" : "none")};
    stroke: red;
    stroke-width: 2;
    transition: fill 0.3s ease;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 10px 0px;
`;

const FlipButton = styled.button<{ $isRate: boolean }>`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background-color: ${({ $isRate }) => ($isRate ? "gold" : "#3498db")};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $isRate }) => ($isRate ? "#bea101" : "#2980b9")};
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const InstructionTxt = styled.p`
  min-width: 230px;
  overflow: auto;
`;

const CocktailCard: React.FC<{
  drinkId: string;
  title: string;
  imgSrc: string;
  category: string;
  glass?: string;
  infoTxt?: string;
  isFavorite: boolean;
  searchType?: string;
  averageRating?: string;
  rateCoctail?: any;
  onToggleFavorite: (id: string) => void;
}> = ({
  drinkId,
  title,
  imgSrc,
  category,
  glass,
  infoTxt,
  averageRating,
  rateCoctail,
  isFavorite,
  onToggleFavorite,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const audio = new Audio("/assets/coctail_sound.mp3");

    const handleFlip = () => {
      setIsFlipped((prevState) => !prevState);
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    };

    return (
      <CardWrapper>
        <Card $isFlipped={isFlipped}>
          {/* Front of the card */}
          <CardFront>
            {isLoading && <Placeholder>Loading...</Placeholder>}
            <CocktailImage
              $isLoading={isLoading}
              src={imgSrc}
              alt={title || "Some coctail"}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                console.error("Error loading image:", imgSrc);
              }}
            />
            <h3>{title}</h3>

            {drinkId && (
              <HeartIcon
                $isFavorite={isFavorite}
                onClick={() => onToggleFavorite(drinkId)}
                onTouchStart={() => onToggleFavorite(drinkId)}
              >
                <svg viewBox="0 0 24 24" width="100%" height="100%">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </HeartIcon>
            )}

            <InfoContainer>
              {category && (
                <span>
                  <BoldSpan>Category:</BoldSpan> {category}
                </span>
              )}

              {glass && (
                <span>
                  <BoldSpan>Glass:</BoldSpan> {glass}
                </span>
              )}

              {Boolean(averageRating) && (
                <span>
                  <BoldSpan>Average Rating:</BoldSpan> {averageRating}
                </span>
              )}
            </InfoContainer>

            <FlipButton $isRate={false} onClick={handleFlip}>
              View Instructions
            </FlipButton>

            {rateCoctail && (
              <FlipButton $isRate onClick={rateCoctail}>
                Rate
              </FlipButton>
            )}
          </CardFront>

          {/* Back of the card */}
          <CardBack>
            <BoldSpan>🥂Instruction🥂</BoldSpan>
            <InstructionTxt>{infoTxt || "No Information"}</InstructionTxt>
            <FlipButton $isRate={false} onClick={handleFlip}>
              Back
            </FlipButton>
          </CardBack>
        </Card>
      </CardWrapper>
    );
  };

export default CocktailCard;
