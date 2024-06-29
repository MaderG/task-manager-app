import { Box, Text, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      py="4"
      px={{ base: '4', md: '8' }}
      bg="gray.800"
      color="white"
      textAlign="center"
      width="100%"
    >
      <Container maxW="5xl">
        <Text>&copy; {new Date().getFullYear()} Nize. Alguns direitos reservados.</Text>
      </Container>
    </Box>
  );
};

export default Footer;