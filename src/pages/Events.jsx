import { Container, Heading, VStack, Text, Box, Link, Button, HStack } from "@chakra-ui/react";
import { useEvents, useDeleteEvent } from "../integrations/supabase/index.js";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Events = () => {
  const { data: events, isLoading, error } = useEvents();
  const deleteEvent = useDeleteEvent();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>Events</Heading>
      <Button as={RouterLink} to="/events/new" colorScheme="teal" mb={4}>Add New Event</Button>
      <VStack spacing={4} align="stretch">
        {events.map(event => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
            <HStack justify="space-between">
              <Link as={RouterLink} to={`/events/${event.id}`}>
                <Heading as="h2" size="md">{event.name}</Heading>
              </Link>
              <HStack spacing={2}>
                <Button size="sm" colorScheme="blue" onClick={() => navigate(`/events/edit/${event.id}`)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(event.id)}>Delete</Button>
              </HStack>
            </HStack>
            <Text>Date: {event.date}</Text>
            <Text>Venue: {event.venue}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Events;