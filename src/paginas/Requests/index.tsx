import React, { useEffect, useState } from "react";
import { AbBotao } from "ds-alurabooks";

import "./Requests.css";
import { IRequest } from "../../interfaces/IRequest";
import http from "../../http";

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const handleLoadRequests = () => {
    http
      .get<IRequest[]>("/pedidos")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        alert("Ocorreu um erro ao trazer o seu pedido");
        console.log(err);
      });
  };

  useEffect(() => {
    handleLoadRequests();
  }, []);

  const handleDeleteRequest = async (id: number) => {
    try {
      const res = await http.delete(`/pedidos/${id}`);

      if (res.status === 200) {
        alert("Pedido excluido com sucesso!");
        setRequests((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Ocorreu um erro ao excluir o seu pedido.");
      }
    } catch (err) {
      alert("Ocorreu um erro ao excluir o seu pedido.");
      console.log(err);
    }
  };

  return (
    <section className="pedidos">
      <h1>Pedidos</h1>

      {requests?.map((request) => (
        <div className="pedido" key={request.id}>
          <ul>
            <li>
              Pedido: <strong>{request.id}</strong>
            </li>
            <li>
              Data do pedido:{" "}
              <strong>{new Date(request.data).toLocaleDateString()}</strong>
            </li>
            <li>
              Valor total:{" "}
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(request.total)}
              </strong>
            </li>
            <li>
              Entrga realizada em:{" "}
              <strong>{new Date(request.entrega).toLocaleDateString()}</strong>
            </li>
            <li>
              <button
                className="request__delete"
                onClick={() => handleDeleteRequest(request.id)}
              >
                Excluir
              </button>
            </li>
          </ul>

          <AbBotao texto="Detalhes" />
        </div>
      ))}
    </section>
  );
};

export default Requests;
