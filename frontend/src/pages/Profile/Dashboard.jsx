import {
  Box,
  Button,
  Center,
  chakra,
  Circle,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Page from '../Components/Page';
import TodoCard from '../Components/TodoCard';
import EditTaskModal from './Modal/EditTaskModal';
import { useTasks } from '../../hooks/useTasks';



const Dashboard = () => {
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading, mutate } = useTasks(`/api/tasks?page=${page}`);

  const tasks = data?.tasks || [];
  const totalPages = data?.totalPages || 1;


  const fetchTasks = async () => {
    await mutate()
  };

  if (isLoading) return <Spinner />;

  return (
    <Page error={error} loading={isLoading} emptyState={!tasks.length ? 'Você não possui nenhuma tarefa :(' : null}>
    <Box maxW="7xl" minH={'calc(100vh - 60px)'} mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }} position='relative'>
      {tasks.length > 0 &&
        <chakra.h1 textAlign="center" fontSize="4xl" py={10} fontWeight="bold">
        Minhas Tarefas
      </chakra.h1>}
      <Center>
        { !tasks.length && <Text py={10} fontSize={'xl'}>Clique no botão de + no canto inferior da tela para começar a organizar suas atividades</Text>}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {tasks.map((task, index) => (
            <TodoCard key={index} task={task} onTaskUpdate={fetchTasks} />
          ))}
        </SimpleGrid>
      </Center>
      {totalPages > 1 && (
        <Center mt="3rem">
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon />}
            onClick={() => setPage(page - 1)}
            isDisabled={page === 1}
            mr="1rem"
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon />}
            onClick={() => setPage(page + 1)}
            isDisabled={page === totalPages}
          />
        </Center>
      )}
      <Box position="absolute" bottom="20px" right="-170px">
        <Circle size="40px" as={Button} onClick={onOpen} colorScheme="blue">
          <AddIcon />
        </Circle>
      </Box>
      <EditTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task={{ title: '', description: '' }}
        onUpdate={fetchTasks}
        isNewTask
      />
    </Box>
    </Page>
  );
};

export default Dashboard;
