import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Container, Box, Typography, Button } from "@mui/material";
const SubmitPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: forms } = useFetch(`http://localhost:3001/forms/${id}`);
  console.log("form are", forms);

  function goToPreview() {
    navigate(`/PreviewPage/${id}`);
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h1" gutterBottom>
          Hi i am response
        </Typography>
        <Button
          onClick={goToPreview}
          type="submit"
          sx={{ paddingInline: "2rem", bgcolor: "lightblue", color: "black" }}
        >
          Submit another response
        </Button>
      </Box>
    </Container>
  );
};

export default SubmitPage;
