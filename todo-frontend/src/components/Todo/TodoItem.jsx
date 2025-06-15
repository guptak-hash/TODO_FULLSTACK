// src/components/Todo/TodoItem.jsx
import { Box, Flex, Text, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { FaEllipsisV, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import { updateTodo, deleteTodo } from '../../services/todos';

const TodoItem = ({ todo, onTodoUpdated, onTodoDeleted }) => {
  const toast = useToast();

  const handleStatusChange = async () => {
    try {
      const updatedTodo = await updateTodo(todo._id, {
        status: todo.status === 'Pending' ? 'Completed' : 'Pending'
      });
      onTodoUpdated(updatedTodo);
      toast({
        title: 'Todo updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating todo',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      onTodoDeleted(todo._id);
      toast({
        title: 'Todo deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting todo',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={4}
      mb={3}
      borderWidth={1}
      borderRadius="md"
      bg={todo.status === 'Completed' ? 'gray.50' : 'white'}
    >
      <Flex align="center">
        <Box flex={1}>
          <Text
            fontWeight="bold"
            textDecoration={todo.status === 'Completed' ? 'line-through' : 'none'}
            color={todo.status === 'Completed' ? 'gray.500' : 'inherit'}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text
              mt={1}
              color={todo.status === 'Completed' ? 'gray.500' : 'gray.600'}
              textDecoration={todo.status === 'Completed' ? 'line-through' : 'none'}
            >
              {todo.description}
            </Text>
          )}
        </Box>
        <Flex>
          <IconButton
            icon={<FaCheck />}
            aria-label="Mark complete"
            onClick={handleStatusChange}
            colorScheme={todo.status === 'Completed' ? 'green' : 'gray'}
            variant="ghost"
            mr={2}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              aria-label="Options"
              variant="ghost"
            />
            <MenuList>
              <MenuItem icon={<FaEdit />}>Edit</MenuItem>
              <MenuItem icon={<FaTrash />} onClick={handleDelete}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TodoItem;