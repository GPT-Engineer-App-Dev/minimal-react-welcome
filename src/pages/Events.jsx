import { Container, Heading, VStack, Text, Box, Link } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";
import { Link as RouterLink } from "react-router-dom";

const Events = () => {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>Events</Heading>
      <VStack spacing={4} align="stretch">
        {events.map(event => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
            <Link as={RouterLink} to={`/events/${event.id}`}>
              <Heading as="h2" size="md">{event.name}</Heading>
            </Link>
            <Text>Date: {event.date}</Text>
            <Text>Venue: {event.venue}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Events;