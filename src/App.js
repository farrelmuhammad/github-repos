import logo from "./logo.svg";
import "./App.css";
import Repositories from "./pages/Repositories";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/repository" element={<Repositories />} />
      </Routes>
    </>
  );
}

export default App;
