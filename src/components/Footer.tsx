import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
  font-size: 14px;
`;

const FooterText = styled.p`
  margin: 0;
  padding: 5px;
`;

const FooterHighlight = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Powered by <FooterHighlight>TypeScript</FooterHighlight> & React</FooterText>
      <FooterText>© {new Date().getFullYear()} Cocktail App. All Rights Reserved.</FooterText>
      <FooterText>This site is for LimeChain. Enjoy your cocktails responsibly.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
