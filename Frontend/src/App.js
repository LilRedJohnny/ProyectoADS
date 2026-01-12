import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Profile from "./pages/Profile";
import History from "./pages/History";  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
       <Route path="/recipe/:id" element={<RecipeDetails />} />

      </Routes>
    </BrowserRouter>
  );
}
