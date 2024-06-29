import { Button, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import fetcher from '../../../services/api';
import React from 'react';
const EditTaskModal = ({ isOpen, onClose, task, onUpdate, isNewTask }) => {
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [error, setError] = React.useState(null);
  const [state, setState] = React.useState('idle');


  const validate = () => {
    if (!title || title.length < 3) {
      setError('O título deve ter no mínimo 3 caracteres.');
      return false;
    }
    setError(null);
    return true;
  }

  const handleSave = async () => {
    setState('submitting');
    try {
      if (isNewTask) {
        await fetcher.post('/api/tasks', { title, description });
        setTitle('');
        setDescription('');
      } else {
        await fetcher.patch(`/api/tasks/${task.id}`, { title, description});
      }
      setState('idle');
      await onUpdate();
      onClose();
    } catch (err) {
      console.error('Failed to create task', err);
      setState('idle');
    }
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay blur={'10%'} backdropFilter={'blur(3px)'} />
      <ModalContent top={'150px'}>
        <ModalHeader>{isNewTask ? 'Criar Tarefa' : 'Editar Tarefa'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" onBlur={validate} isInvalid={!!error}/>
          {error && <chakra.span color="red.500">{error}</chakra.span>}
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" mt={4} resize={'none'} />
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={title.length < 3}
            colorScheme={'blue'}
            isLoading={state === 'submitting'}
            onClick={handleSave}
          >
            {isNewTask ? 'Criar' : 'Salvar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;