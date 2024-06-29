import { Box, Button, Center, Flex, Heading, Image, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Avatar from 'boring-avatars';
import EditProfileModal from './Modal/EditProfileModal';

const ProfileCard = ({ data, tasks, completedTasks, lastTask, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bio = localStorage.getItem('bio') || 'Uma pessoa feliz';

  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        minH={'493px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={100}
            name={data.name}
            variant='beam'
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {data.name}
            </Heading>
            <Text color={'gray.500'}>{bio}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{tasks}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Tarefas Totais
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{completedTasks}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Tarefas Concluídas
              </Text>
            </Stack>
          </Stack>

          <Stack spacing={0} align={'center'} mt={4}>
            <Text fontWeight={600}>Última Tarefa Concluída</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              {lastTask}
            </Text>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={onOpen}
            >
            Editar Perfil
          </Button>
        </Box>
      </Box>
      <EditProfileModal isOpen={isOpen} onClose={onClose} user={data} onUpdate={onUpdate} />
    </Center>
  )
}

export default ProfileCard;