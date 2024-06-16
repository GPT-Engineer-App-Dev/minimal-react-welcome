import { Container, Heading, VStack, Input, Button, useToast, Text, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEvent, useUpdateEvent, useVenues } from "../integrations/supabase/index.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const { data: event, isLoading, error } = useEvent(id);
  const { data: venues } = useVenues();
  const updateEvent = useUpdateEvent();
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [venue, setVenue] = useState("");

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(new Date(event.date));
      setVenue(event.venue);
    }
  }, [event]);

  const handleSubmit = () => {
    updateEvent.mutate({ id, name, date, venue }, {
      onSuccess: () => {
        toast({
          title: "Event updated.",
          description: "The event has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/events");
      },
      onError: (error) => {
        toast({
          title: "Error updating event.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading event details</Text>;

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>Edit Event</Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <Select placeholder="Select Venue" value={venue} onChange={(e) => setVenue(e.target.value)}>
          {venues && venues.map((venue) => (
            <option key={venue.id} value={venue.id}>{venue.name}</option>
          ))}
        </Select>
        <Button colorScheme="teal" onClick={handleSubmit}>Update Event</Button>
      </VStack>
    </Container>
  );
};

export default EditEvent;