import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotaoNavegacao from "../BotaoNavegacao";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";
import logo from "./assets/logo.png";
import usuario from "./assets/usuario.svg";
import "./BarraNavegacao.css";

const BarraNavegacao = () => {
  const navigate = useNavigate()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  const [isUserLogged, setIsUserLogged] = useState<boolean>(token !== null);

  const logout = () => {
    setIsUserLogged(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="ab-navbar">
      <h1 className="logo">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo da AluraBooks" />
        </Link>
      </h1>
      <ul className="navegacao">
        <li>
          <a href="#!">Categorias</a>
          <ul className="submenu">
            <li>
              <Link to="/">Frontend</Link>
            </li>
            <li>
              <Link to="/">Programação</Link>
            </li>
            <li>
              <Link to="/">Infraestrutura</Link>
            </li>
            <li>
              <Link to="/">Business</Link>
            </li>
            <li>
              <Link to="/">Design e UX</Link>
            </li>
          </ul>
        </li>
      </ul>
      <ul className="acoes">
        {!isUserLogged ? (
          <>
            <li>
              <BotaoNavegacao
                onClick={() => setIsLoginModalOpen(true)}
                texto="Login"
                textoAltSrc="Icone representando um usuário"
                imagemSrc={usuario}
              />
            </li>
            <li>
              <BotaoNavegacao
                onClick={() => setIsSignUpModalOpen(true)}
                texto="Cadastrar-se"
                textoAltSrc="Icone representando um usuário"
                imagemSrc={usuario}
              />
              <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={() => setIsUserLogged(true)}
              />
              <SignUpModal
                isOpen={isSignUpModalOpen}
                onClose={() => setIsSignUpModalOpen(false)}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/minha-conta/pedidos">Minha conta</Link>
            </li>
            <li>
              <BotaoNavegacao
                texto="Logout"
                textoAltSrc="Icone representando um usuário"
                imagemSrc={usuario}
                onClick={logout}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default BarraNavegacao;
