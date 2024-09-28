import React, { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import styled from "styled-components";
import useMetaMaskInstalled from "../hooks/useMetamaskInstalled";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const UserCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0aaff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
  margin-right: 10px;
`;

const Loader = styled.div`
  border: 3px solid #e0aaff;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Button = styled.button`
  background-color: #e0aaff;
  color: black;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d09cd5;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const StyledMessage = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const MetaMaskLogo = styled.img`
  width: 50px;
  margin-bottom: 20px;
`;

const WalletConnect: React.FC = () => {
    const isMetaMaskInstalled = useMetaMaskInstalled();
    const [showModal, setShowModal] = useState<boolean>(false);
    const { connect } = useConnect();
    const { isConnected, address, isConnecting } = useAccount();
    const { disconnect } = useDisconnect();

    const handleConnect = async () => {
        if (isMetaMaskInstalled) {
            await connect({ connector: injected() });
        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => setShowModal(false);

    const formattedAddress = address ? `${address.slice(0, 5)}...` : "";

    return (
        <Container>
            {isConnected ? <UserCircle>{formattedAddress[2]}</UserCircle> : null}
            {isConnected ? (
                <>
                    <p style={{ marginRight: "10px" }}>0x{formattedAddress}</p>
                    <Button onClick={() => disconnect()}>Disconnect Wallet</Button>
                </>
            ) : (
                <>
                    <Button onClick={handleConnect} disabled={isConnecting}>
                        {isConnecting ? <Loader /> : "Connect Wallet"}
                    </Button>
                    {showModal && (
                        <ModalOverlay onClick={closeModal}>
                            <Modal onClick={(e) => e.stopPropagation()}>
                                <MetaMaskLogo
                                    src="/assets/MetaMask_Fox.svg.png"
                                    alt="MetaMask Logo"
                                />
                                <ModalHeader>MetaMask Not Detected</ModalHeader>
                                <StyledMessage>
                                    Seems like you don't have MetaMask in your extensions. No
                                    worries, you can get it here!
                                </StyledMessage>
                                <a
                                    href="https://metamask.io/download.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button>Download MetaMask</Button>
                                </a>
                            </Modal>
                        </ModalOverlay>
                    )}
                </>
            )}
        </Container>
    );
};

export default WalletConnect;
