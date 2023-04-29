import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import React, { useState } from "react";

import MainImage from "./assets/login.png";

import "./SignUpModal.css";
import http from "../../http";

interface ISignUpModal {
  isOpen: boolean;
  onClose: () => void;
}
const SignUpModal: React.FC<ISignUpModal> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      nome: name,
      email,
      endereco: address,
      senha: password,
      cep: zipCode,
      complemento: complement,
    };

    http
      .post("/public/registrar", user)
      .then(() => {
        setName("");
        setEmail("");
        setAddress("");
        setComplement("");
        setZipCode("");
        setPassword("");
        setConfirmedPassword("");
        alert("usuario criado");
        onClose();
      })
      .catch(() => {
        alert("erro");
      });
  };

  return (
    <AbModal titulo="Cadastrar" aberta={isOpen} aoFechar={onClose}>
      <div className="signup__modal__body">
        <figure>
          <img
            src={MainImage}
            alt="Monitor com uma fechadura e uma pessoa comuma fache logo ao lado"
          />
        </figure>
        <form onSubmit={handleSubmit}>
          <AbCampoTexto label="Nome" value={name} onChange={setName} />
          <AbCampoTexto
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
          />
          <AbCampoTexto
            label="Endereço"
            value={address}
            onChange={setAddress}
          />
          <AbCampoTexto
            label="Complemento"
            value={complement}
            onChange={setComplement}
          />
          <AbCampoTexto label="CEP" value={zipCode} onChange={setZipCode} />
          <AbCampoTexto
            type="password"
            label="Senha"
            value={password}
            onChange={setPassword}
          />
          <AbCampoTexto
            type="password"
            label="Confirmar senha"
            value={confirmedPassword}
            onChange={setConfirmedPassword}
          />

          <footer>
            <AbBotao texto="Cadastrar" />
          </footer>
        </form>
      </div>
    </AbModal>
  );
};

export default SignUpModal;
