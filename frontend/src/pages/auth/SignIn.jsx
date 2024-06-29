import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserContext';
import { Link as ReactLink } from 'react-router-dom';
import './Auth.module.css';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const signInSchema = z.object({
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' }),
});

const SignIn = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const { userLogin } = React.useContext(UserContext);

  const onSignIn = async (form) => {

    try{
      await userLogin(form.email, form.password, form.rememberMe);
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <Flex
      minH={'calc(100vh - 60px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Entre na sua conta</Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            para começar a organizar seu dia a dia ✌️
          </Text>
        </Stack>
        <Box
          minW={{ base: '90%', md: '468px' }}
          minH={'400px'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack as="form" onSubmit={handleSubmit(onSignIn)} spacing={4}>
            <FormControl id="email" isInvalid={!!formState.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input  type="email" {...register('email')} />
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox {...register('rememberMe')} >Manter login</Checkbox>
                <Link as={ReactLink} to={'/forgot-password'} color={'blue.400'}>Esqueceu a senha?</Link>
              </Stack>
              <Button
                isDisabled={!formState.isValid || formState.isSubmitting}
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Entrar
              </Button>
            </Stack>
            <Text align={'center'}>
                Ainda não tem uma conta? <Link as={ReactLink} to='/register' color={'blue.400'}>Cadastre-se</Link>
              </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignIn;
