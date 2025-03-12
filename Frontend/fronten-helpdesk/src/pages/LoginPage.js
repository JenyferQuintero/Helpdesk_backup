import React, { useState } from "react";
import axios from "axios";
import Imagen from "../imagenes/logo proyecto color.jpeg";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Importa los iconos que necesites
import "../styles/LoginPage.css";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUser] = useState("");
  const [password, setPassword] = useState("");  // Cambio de 'contraseña' a 'password'
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para mostrar carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Limpiar mensaje previo

    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/login", {
        usuario,
        password,  // Cambio clave para evitar problemas con la ñ
      });
      if (response.status === 200) {
        const { usuario, rol } = response.data;
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("rol", rol);
        console.log(rol);

        if (rol === "usuario") {
          navigate("/home");
        }
        else if (rol === "administrador"){
        navigate("/HomeAdmiPage");
      }
      else {
        alert("Sin rol para ingresar")
        window.location.reload()
      }
        // Redirige al Dashboard
      }
      setMessage(response.data.mensaje); // El backend envía 'mensaje', no 'message'
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Usuario o Contraseña incorrecta"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contLogin">
      <header>
        <img src={Imagen} alt="Logo" className="empresarial" />
        <h1>BIENVENIDOS A HELP DESK JCDB</h1>
      </header>

      <div className="row">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">

            <input
              type="text"
              placeholder="USUARIO"
              value={usuario}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <i className="bx bx-lock-open"></i>
            <input
              type="password"
              placeholder="CONTRASEÑA"
              value={password}  // Cambio aquí también
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Aceptar"}
          </button>
        </form>

        {message && <p className="mensaje">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
