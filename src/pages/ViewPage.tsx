/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Container, Box, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ViewResponse: React.FC = () => {
  const navigate = useNavigate();
  const { response: responses } = useFetch(
    "http://localhost:3001/userResponse"
  );

  if (!responses) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const totalResponses = responses.length;
  const GoBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          Total Responses: {totalResponses}
        </Typography>
        {responses.map((response: any, index: number) => (
          <Box
            key={index}
            my={2}
            p={2}
            border="1px solid #ccc"
            borderRadius="8px"
          >
            <Typography variant="subtitle1">Response {index + 1}</Typography>
            <Box ml={2}>
              {Object.entries(response).map(([key, value]) => (
                <Typography key={key} variant="body1">
                  {key} {value}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          color="success"
          sx={{
            padding: "1rem",
          }}
          onClick={GoBack}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default ViewResponse;
