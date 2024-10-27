import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import PokemonDetail from "./components/detail/PokemonDetail";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pokemon/:id" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
