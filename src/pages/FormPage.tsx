// CreateForm.tsx
import { useState } from "react";
// import { useParams } from "react-router-dom";
import { Container, TextField, Button, Box } from "@mui/material";
import FieldComponent from "../@core/components/FieldComponent";

const CreateForm: React.FC = () => {
  //   const { id } = useParams();
  const [fields, setFields] = useState<number[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleAddField = () => {
    setFields([...fields, fields.length]);
  };
  return (
    <Container>
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            variant="standard"
            margin="normal"
            placeholder="Add Title"
            sx={{ width: "60%" }}
            inputProps={{ style: { fontSize: 25 } }}
          />

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleAddField}
            >
              Add Field
            </Button>
          </Box>
          {fields.map((_, index) => (
            <FieldComponent key={index} />
          ))}
        </form>
      </Box>
    </Container>
  );
};

export default CreateForm;
