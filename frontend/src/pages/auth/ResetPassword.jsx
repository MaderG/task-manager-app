'use client';

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  FormLabel,
} from '@chakra-ui/react';
import fetcher from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await fetcher.post('/api/reset-password', { token, password: data.newPassword });
      toast({
        title: 'Senha redefinida',
        description: 'Sua senha foi redefinida com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      setError('confirmPassword', {
        type: 'manual',
        message: 'Erro ao redefinir a senha. Tente novamente.',
      });
      toast({
        title: 'Erro',
        description: 'Erro ao redefinir a senha. Tente novamente.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={'calc(100vh - 60px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        as={'form'}
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Redefinir Senha
        </Heading>
        <Text fontSize={{ base: 'sm', sm: 'md' }} color={useColorModeValue('gray.800', 'gray.400')}>
          Insira sua nova senha abaixo.
        </Text>
        <FormControl id="newPassword" isInvalid={errors.newPassword}>
          <FormLabel>Nova Senha</FormLabel>
          <Input
            type="password"
            {...register('newPassword')}
          />
          {errors.newPassword && <Text color="red.500">{errors.newPassword.message}</Text>}
        </FormControl>
        <FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
          <FormLabel>Confirme a Nova Senha</FormLabel>
          <Input
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <Text color="red.500">{errors.confirmPassword.message}</Text>}
        </FormControl>
        <Stack spacing={6}>
          <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}
          >
            Redefinir Senha
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
