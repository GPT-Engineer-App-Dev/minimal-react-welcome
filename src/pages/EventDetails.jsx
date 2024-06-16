import { Container, Heading, VStack, Text, Box, Input, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEvent, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, error: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments();
  const addComment = useAddComment();
  const [commentContent, setCommentContent] = useState("");

  const handleAddComment = () => {
    addComment.mutate({ content: commentContent, event_id: id });
    setCommentContent("");
  };

  if (eventLoading || commentsLoading) return <Spinner />;
  if (eventError) return (
    <Alert status="error">
      <AlertIcon />
      Error loading event details
    </Alert>
  );
  if (commentsError) return (
    <Alert status="error">
      <AlertIcon />
      Error loading comments
    </Alert>
  );

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6}>{event.name}</Heading>
      <Text>Date: {event.date}</Text>
      <Text>Venue: {event.venue}</Text>
      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>Comments</Heading>
        <VStack spacing={4} align="stretch">
          {comments.filter(comment => comment.event_id === parseInt(id)).map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md">
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </VStack>
        <Box mt={4}>
          <Input
            placeholder="Add a comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <Button mt={2} onClick={handleAddComment}>Submit</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EventDetails;