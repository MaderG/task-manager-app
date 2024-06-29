import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { UserContext } from '../../../context/UserContext';;

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {

  const { updateUser } = React.useContext(UserContext);
  const [name, setName] = React.useState(user.name);
  const [bio, setBio] = React.useState('Uma pessoa feliz' || localStorage.getItem('bio'));
  const [error, setError] = React.useState(null);
  const [state, setState] = React.useState('idle');

  const validate = () => {
    if (!name || name.length < 3) {
      setError('O nome deve ter no mínimo 3 caracteres.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setState('submitting');
    try {
      localStorage.setItem('bio', bio);
      await updateUser({ ...user, name });
      await onUpdate();
      setState('idle');
      onClose();
    } catch (err) {
      console.error('Failed to update profile', err);
      setState('idle');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay blur="10%" backdropFilter="blur(3px)" />
      <ModalContent top="150px">
        <ModalHeader>Editar Perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Nome</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            onBlur={validate}
            isInvalid={!!error}
          />
          {error && <Text color="red.500">{error}</Text>}
          <FormLabel>Bio</FormLabel>
          <Textarea
            resize={'none'}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            
          />
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={name.length < 3}
            colorScheme="blue"
            isLoading={state === 'submitting'}
            onClick={handleSave}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
