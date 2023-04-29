import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import React, { useState } from "react";

import MainImage from "./assets/login.png";

import "./LoginModal.css";
import http from "../../http";

interface ILoginModal {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}
const LoginModal: React.FC<ILoginModal> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email,
      senha: password,
    };

    http
      .post("/public/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        setEmail("");
        setPassword("");
        onLogin();
        onClose();
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("Ocorreu um erro inesperado ao efetuar o seu login.");
        }
      });
  };

  return (
    <AbModal titulo="Login" aberta={isOpen} aoFechar={onClose}>
      <div className="login__modal__body">
        <figure>
          <img
            src={MainImage}
            alt="Monitor com uma fechadura e uma pessoa comuma fache logo ao lado"
          />
        </figure>
        <form onSubmit={handleSubmit}>
          <AbCampoTexto
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
          />
          <AbCampoTexto
            type="password"
            label="Senha"
            value={password}
            onChange={setPassword}
          />

          <footer>
            <AbBotao texto="Login" />
          </footer>
        </form>
      </div>
    </AbModal>
  );
};

export default LoginModal;
