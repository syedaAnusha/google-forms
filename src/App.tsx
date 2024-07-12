import CreateNewFormButton from "./@core/components/Button/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import SubmitPage from "./pages/SubmitPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateNewFormButton />} />
          <Route path="/forms/:id" element={<FormPage />} />
          <Route path="/PreviewPage/:id" element={<PreviewPage />} />
          <Route path="/SubmitPage/:id" element={<SubmitPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
