import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import fetcher from '../../services/api';
import React, { useState } from 'react';
import EditTaskModal from '../Profile/Modal/EditTaskModal';

const TodoCard = ({ task, onTaskUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState('idle');
  const [selectedTask, setSelectedTask] = useState(null);
  const toast = useToast();

  const handleComplete = async () => {
    setState('submitting');
    try {
      const completedAt = new Date().toISOString();
      await fetcher.patch(`/api/tasks/${task.id}`, { completed: true, completedAt });  
      toast({
        title: 'Tarefa concluída.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onTaskUpdate();
    } catch (err) {
      console.error('Failed to update task', err);
      setState('idle');
    }
  };

  const handleDelete = async () => {
    try {
      await fetcher.delete(`/api/tasks/${task.id}`);
      toast({
        title: 'Tarefa deletada.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onTaskUpdate();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleEdit = () => {
    setSelectedTask(task);
    onOpen();
  };

  const handleClose = () => {
    setSelectedTask(null);
    onClose();
  };

  return (
    <Card minW={'300px'}>
      <CardHeader>
        <Heading>{task.title}</Heading>
      </CardHeader>
      <CardBody>
        {task.description || 'Sem descrição'}
      </CardBody>
      <CardFooter>
        <Button
          colorScheme={'blue'}
          isLoading={state === 'submitting'}
          onClick={handleComplete}
          size="sm"
        >
          <CheckIcon />
        </Button>
        <Button colorScheme="gray" onClick={handleEdit} size="sm" ml={2}>
          <EditIcon />
        </Button>
        <Button colorScheme="red" onClick={handleDelete} size="sm" ml={2}>
          <DeleteIcon />
        </Button>
      </CardFooter>
      {selectedTask && (
        <EditTaskModal
          isOpen={isOpen}
          onClose={handleClose}
          task={selectedTask}
          onUpdate={onTaskUpdate}
        />
      )}
    </Card>
  );
};

export default TodoCard;
