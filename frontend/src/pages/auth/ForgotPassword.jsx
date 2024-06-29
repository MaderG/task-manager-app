'use client'

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import React from 'react'
import fetcher from '../../services/api'


export default function ForgotPassword() {

  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const toast = useToast()

  const validate = (email) => {
    if (!email || !email.includes('@')) {
      setError('Endereço de email inválido')
      return false
    }
    setError(null)
    return true
  }

  const handleSubmit = async (e) => {
    setSubmitting(true)
    e.preventDefault()
    if (!validate(email)) return
    try{
    await fetcher.post('/api/forgot-password', {email})
    setSubmitting(false)
    toast({
      title: 'Email enviado',
      description: 'Verifique sua caixa de entrada',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  } catch (err) {
      console.error(err)
      setError(err.message)
      toast({
        title: 'Erro',
        description: err.cause,
        status: 'error',
        duration: 9000,
        isClosable: true,})
    }

  }

  return (
    <Flex
      minH={'calc(100vh - 60px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        onSubmit={handleSubmit}
        as={'form'}
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Esqueceu sua senha?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Você irá receber um email com um link para redefinir sua senha.
        </Text>
        <FormControl id="email">
          <Input
            onBlur={() => validate(email)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email@exemplo.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
          {error && <Text color="red.500">{error}</Text>}
        </FormControl>
        <Stack spacing={6}>
          <Button
            isDisabled={submitting}
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}