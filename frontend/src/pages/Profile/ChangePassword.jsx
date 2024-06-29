import {
  Button,
  Input,
  Heading,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  useColorModeValue,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import fetcher from '../../services/api';
import { z } from 'zod';
import { Link as ReactLink } from 'react-router-dom';

const changePasswordSchema = z.object({
  email: z.string().email('Email inválido.'),
  oldPassword: z.string().min(6, 'A senha antiga deve ter pelo menos 6 caracteres.'),
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
});

const ChangePassword = () => {
  const { data, updateUser, userLogout } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  const validate = () => {
    try {
      changePasswordSchema.parse({ email, oldPassword, newPassword });
      setError(null);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (email !== data.email) {
      setError('Email inválido.');
      return;
    }

    try {
      await fetcher.post('/api/profile/change-password', { oldPassword, newPassword });
      await updateUser({ ...data, password: newPassword });
      userLogout();
      toast({
        title: 'Senha alterada com sucesso!',
        description: 'Entre com sua nova senha.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Failed to update password', err);
      toast({
        title: 'Erro ao alterar senha',
        description: 'Verifique os dados e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={'calc(100vh - 60px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Alterar Senha
        </Heading>
        {error && <Text color="red.500">{error}</Text>}
        <FormControl id="email" isRequired>
          <FormLabel>Endereço de email</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="seuemail@exemplo.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="old-password" isRequired>
          <FormLabel>Senha Antiga</FormLabel>
          <Input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Senha Antiga"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <FormControl id="new-password" isRequired>
          <FormLabel>Nova Senha</FormLabel>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova Senha"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            as={ReactLink}
            to='/profile'
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => {
              setOldPassword('');
              setNewPassword('');
              setError(null);
            }}>
            Cancelar
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleSave}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ChangePassword;
