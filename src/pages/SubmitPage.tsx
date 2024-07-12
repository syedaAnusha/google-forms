//* React Imports
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//* MUI Imports
import { Container, Box, Typography, Button } from "@mui/material";
const SubmitPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: forms } = useFetch(`http://localhost:3001/forms/${id}`);
  console.log("form are", forms);

  function goToPreview() {
    navigate(`/PreviewPage/${id}`);
  }
  function goToHome() {
    navigate(`/`);
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h1" gutterBottom>
          Responses Submitted
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            onClick={goToPreview}
            type="submit"
            sx={{ paddingInline: "2rem", bgcolor: "lightblue", color: "black" }}
          >
            Submit another response
          </Button>
          <Button
            onClick={goToHome}
            type="submit"
            sx={{ paddingInline: "2rem", bgcolor: "lightblue", color: "black" }}
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SubmitPage;
