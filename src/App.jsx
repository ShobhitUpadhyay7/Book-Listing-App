import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/homePg";
import RegisterPage from "./Pages/register";
import LoginPage from "./Pages/login";
import ListingPage from "./Pages/list";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/list" element={<ListingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
