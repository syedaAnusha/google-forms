import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function CreateNewFormButton() {
  const navigate = useNavigate();

  const generateRandomId = (): number => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleCreateForm = async () => {
    const newId = String(generateRandomId());
    const newForm = { id: newId };

    try {
      const response = await fetch("http://localhost:3001/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      if (response.ok) {
        navigate(`/forms/${newId}`);
      } else {
        console.error("Failed to create form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBlock: "auto",
        marginTop: "20rem",
      }}
    >
      <Button
        variant="contained"
        color="success"
        sx={{
          padding: "2rem",
        }}
        onClick={handleCreateForm}
      >
        Create google Form
      </Button>
    </Box>
  );
}
