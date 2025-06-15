// src/components/Navbar.jsx
import { Flex, Box, Link, Button, useColorModeValue, Heading, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bg} boxShadow="md" px={4}>
      <Flex h={16} alignItems="center" maxW="1200px" mx="auto">
        <Heading size="md" color="brand.600">
          Todo App
        </Heading>
        <Spacer />
        <Box>
          {currentUser ? (
            <>
              <Button as={RouterLink} to="/dashboard" variant="ghost" mr={2}>
                Dashboard
              </Button>
              <Button as={RouterLink} to="/profile" variant="ghost" mr={2}>
                Profile
              </Button>
              <Button onClick={logout} colorScheme="brand">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost" mr={2}>
                Login
              </Button>
              <Button as={RouterLink} to="/signup" colorScheme="brand">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;