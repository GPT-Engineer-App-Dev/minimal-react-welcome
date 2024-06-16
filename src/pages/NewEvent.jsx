import { Container, Heading, VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAddEvent } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const addEvent = useAddEvent();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    addEvent.mutate({ name, date, venue }, {
      onSuccess: () => {
        toast({
          title: "Event created.",
          description: "The event has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/events");
      },
      onError: (error) => {
        toast({
          title: "Error creating event.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>New Event</Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Event Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Input placeholder="Event Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
        <Button colorScheme="teal" onClick={handleSubmit}>Create Event</Button>
      </VStack>
    </Container>
  );
};

export default NewEvent;