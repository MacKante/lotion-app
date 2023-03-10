import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditNote from "./components/EditNote";
import ViewNote from "./components/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace={true} />}></Route>
        <Route path="/notes" element={<Layout />}>
          <Route path="/notes/:noteId" element={<ViewNote />}></Route>
          <Route path="/notes/:noteId/edit" element={<EditNote />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
