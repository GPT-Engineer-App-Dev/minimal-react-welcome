import { Container, Heading, VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session, loading, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out.",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  if (session) {
    return (
      <Container maxW="container.md" py={8}>
        <Heading as="h1" mb={6}>Welcome, {session.user.email}</Heading>
        <Button colorScheme="teal" onClick={handleLogout}>Logout</Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>Login</Heading>
      <VStack spacing={4} align="stretch">
        <SupabaseAuthUI />
      </VStack>
    </Container>
  );
};

export default Login;