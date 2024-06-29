import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  SlideFade,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import React from 'react';

const Home= () => {

  const { login, loading } = React.useContext(UserContext)
  const leiaMaisRef = React.useRef(null)

  const handleLeiaMais = () => {
    leiaMaisRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  

  if(loading) return <Spinner />

  if (login) return <Navigate to='/dashboard' />

  return (
    <>
    <Flex minH="calc(100vh - 60px)" align="center" justify="center">
    <Container maxW={'5x1'}>
      <SlideFade offsetY={'50px'} in={'true'} transition={{ enter: { duration: .3 }}}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Organize suas tarefas com{' '}
            <Text as={'span'} color={'blue.400'}>
              facilidade
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            Nunca perca uma tarefa. Esteja sempre no controle. Mantenha suas tarefas organizadas
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.500' }}>
              <Link to='/register'>Começar</Link>
            </Button>
            <Button rounded={'full'} px={6} onClick={handleLeiaMais}>
              Leia mais
            </Button>
          </Stack>
        </Stack>
        </SlideFade>
    </Container>
    
    </Flex>
    <Box ref={leiaMaisRef} w="100%" py={{ base: 20, md: 28 }}>
        <Container maxW={'5xl'}>
          <Heading as="h2" size="xl" ml={'1rem'} textAlign="left" mb={8}>Eficiência</Heading>
          <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Text fontSize="lg" color={'gray.500'} maxW={{ base: '100%', md: '50%' }} mb={{ base: 8, md: 0 }}>
              O nosso aplicativo de lista de tarefas é a ferramenta ideal para você que deseja manter suas atividades organizadas e aumentar sua produtividade. Com uma interface intuitiva e recursos poderosos, você pode criar, editar e gerenciar suas tarefas com facilidade. 
            </Text>
            <Box maxW={{ base: '100%', md: '50%' }}>
              <img src="site.png" alt="Imagem leia mais" style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Flex>
          <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.500' }}>
              <Link to='/register'>Quero começar agora</Link>
            </Button>
        </Container>
      </Box>
      </>
    
  );
}



export default Home