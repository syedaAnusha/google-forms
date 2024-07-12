/* eslint-disable @typescript-eslint/no-explicit-any */
//* React Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//* MUI Imports
import { Container, Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";

const ViewResponse: React.FC = () => {
  const Mobile = useMediaQuery("(min-width:300px)");

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
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: Mobile ? "18px" : "20px" }}
        >
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
              {Object.entries(response).map(([key, value]: any) => (
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
            padding: Mobile ? ".5rem" : "1rem",
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
