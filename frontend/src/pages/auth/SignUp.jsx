import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  FormErrorMessage,
} from '@chakra-ui/react';
import { z } from 'zod'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import fetcher from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.module.css';


const signUpSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' }),
})

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const toast = useToast();
  const navigate = useNavigate()
  
  const onSignUp = async (form) => {
    try{
      await fetcher.post('/api/register', form);
      toast({
        title: 'Success',
        description: 'Account created successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate('/login')
    } catch (err) {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        
        })
      }
  }

  return (
    <Flex
      minH={'calc(100vh - 60px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Cadastre-se
          </Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            para trazer mais organização e eficiência ao seu dia a dia ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack as='form' onSubmit={handleSubmit(onSignUp)} spacing={4}>
            <HStack>
              <Box minW={'362.47px'}>
                <FormControl id="name" isInvalid={!!formState.errors.name}>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" {...register('name')}/>
                  <FormErrorMessage>
                  {formState.errors.name && formState.errors.name.message}
                </FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isInvalid={!!formState.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register('email')}/>
              <FormErrorMessage>
                {formState.errors.email && formState.errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!formState.errors.password}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} {...register('password')}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formState.errors.password && formState.errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isDisabled={!formState.isValid || formState.isSubmitting}
                type="submit"
                isLoading={formState.isSubmitting}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Cadastrar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Já é um usuário? <ChakraLink as={Link} to='/login' color={'blue.400'}>Entre</ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;