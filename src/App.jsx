import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import Header from "./parts/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
