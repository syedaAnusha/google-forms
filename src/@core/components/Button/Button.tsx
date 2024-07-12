import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useFetch from "../../../hooks/useFetch";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function CreateNewFormButton() {
  const navigate = useNavigate();
  const { response: responses } = useFetch(
    "http://localhost:3001/userResponse"
  );

  const generateRandomId = (): number => {
    return Math.floor(Math.random() * 1000000);
  };
  const viewResponse = () => {
    navigate("/ViewPage");
  };
  const viewInSheets = () => {
    if (responses) {
      const worksheet = XLSX.utils.json_to_sheet(responses);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Buffer to store the generated Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      saveAs(blob, "data.xlsx");
    }
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
        gap: "1rem",
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
        Create Google Form
      </Button>

      <Button
        variant="contained"
        color="success"
        sx={{
          padding: "1rem",
        }}
        onClick={viewResponse}
      >
        View responses
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{
          padding: "1rem",
        }}
        onClick={viewInSheets}
      >
        View in Sheets
      </Button>
    </Box>
  );
}
