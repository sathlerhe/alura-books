import { Route, Routes } from "react-router-dom";
import Home from "../paginas/Home";
import LoggedArea from "../paginas/LoggedArea";
import PaginaBase from "../paginas/PaginaBase";
import Requests from "../paginas/Requests";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaBase />}>
        <Route path="/" element={<Home />} />

        <Route path="/minha-conta" element={<LoggedArea />}>
          <Route path="pedidos" element={<Requests />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Rotas;
