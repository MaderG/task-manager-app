import React from 'react'
import {Table, TableCaption, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Flex, Center, IconButton} from '@chakra-ui/react'
import fetcher from '../../services/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Page from '../Components/Page';
import { useTasks } from '../../hooks/useTasks';


const History = () => {

  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);
  // const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  // const [totalPages, setTotalPages] = React.useState(0);
  const { data, error, isLoading } = useTasks(`/api/tasks/history?page=${page}`);
  const tasks = data?.tasks || [];
  const totalPages = data?.totalPages || 1;


  return (
    <Page loading={isLoading} error={error} emptyState={!tasks.length ?'Você ainda não possui nenhum histórico' : null}>
    <Flex direction={'column'} justify={'center'} minH={'calc(100vh - 60px)'} bg={'gray.50'} >
  <Center>
    <TableContainer>
  <Table variant='simple'>
    <TableCaption>Histórico de tarefas</TableCaption>
    <Thead>
      <Tr>
        <Th>Nome da tarefa</Th>
        <Th>Data de conclusão</Th>
      </Tr>
    </Thead>
    <Tbody>
    {tasks.map(task => (
                <Tr key={task.id}>
                  <Td>{task.title}</Td>
                  <Td>
                    {format(new Date(task.updatedAt), 'PPp', { locale: ptBR })}
                  </Td>
                </Tr>
              ))}
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>Nome da tarefa</Th>
        <Th>data de conclusão</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
</Center>
  {totalPages > 1 && (
    <Center mt="3rem">
      <IconButton
        colorScheme='blue'
        variant='solid'
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
        onClick={() => setPage(page - 1)}
        isDisabled={page === 1}
        mr="1rem"
      />
      <IconButton
        colorScheme='blue'
        variant='solid'
        aria-label="Next"
        icon={<ChevronRightIcon />}
        onClick={() => setPage(page + 1)}
        isDisabled={page === totalPages}
      />
    </Center>
  )}
  </Flex>
  </Page>
  )
}

export default History