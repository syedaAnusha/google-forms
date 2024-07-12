//* React Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

//* Custom Page Imports
import CreateNewFormButton from "./@core/components/Button/Button";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import SubmitPage from "./pages/SubmitPage";
import ViewPage from "./pages/ViewPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateNewFormButton />} />
          <Route path="/forms/:id" element={<FormPage />} />
          <Route path="/PreviewPage/:id" element={<PreviewPage />} />
          <Route path="/SubmitPage/:id" element={<SubmitPage />} />
          <Route path="/ViewPage" element={<ViewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
