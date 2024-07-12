import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Box } from "@mui/material";
import FieldComponent from "../@core/components/FieldComponent";
import useFetch from "../hooks/useFetch";

const CreateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: forms } = useFetch("http://localhost:3001/forms");
  const [fields, setFields] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (id && forms) {
      const form = forms.find((form: { id: string }) => form.id === id);
      if (form) {
        setTitle(form.title || "");
      }
    }
  }, [id, forms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(forms);

    if (!id || !/^[a-zA-Z0-9]+$/.test(id)) {
      console.error("Invalid id format or empty id.");
      return;
    }

    try {
      const formExists = forms.some((form: { id: string }) => form.id === id);

      if (!formExists) {
        console.error(`Form with id '${id}' does not exist.`);
        return;
      }

      const response = await fetch(`http://localhost:3001/forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        console.log("Form data updated successfully!");
      } else {
        console.error("Failed to update form data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddField = () => {
    if (!title.length) {
      return;
    } else {
      setFields([...fields, fields.length]);
    }
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
            required={true}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
