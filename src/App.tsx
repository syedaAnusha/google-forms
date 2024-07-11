import CreateNewFormButton from "./@core/components/Button/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateNewFormButton />} />
          <Route path="/forms/:id" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
