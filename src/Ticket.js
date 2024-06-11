import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { MyButtonToHome } from "./components/ButtonToHome";
import { useLocation } from "react-router-dom";

const Ticket = () => {
  const { auto, formData } = useLocation().state;

  const calculateDays = () => {
    const startDate = new Date(auto.startDateAvailable);
    const endDate = new Date(auto.endDateAvailable);

    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  }

  const calculateTotalPrice = () => {
    return calculateDays() * auto.pricePerDay;
  };

  return (
    <div
      className="container-fluid mt-12 d-flex flex-column min-vh-100 align-items-center"
      style={{
        backgroundImage: "linear-gradient(to right, #000000, #2b2b2b)",
      }}
    >
      <h1 className="text-center mb-4 text-light" style={{ margin: "60px" }}>
        ¡HAS RENTADO UN AUTO!
      </h1>
      <h2 className="text-center mb-4 text-light" style={{ margin: "60px" }}>
        DETALLES DE LA RENTA
      </h2>
      <div className="container-fluid mt-12 d-flex flex-column w-75  justify-content-center align-items-center">
        <div
          className="container-fluid mt-12 d-flex flex-column w-75 "
          style={{ margin: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="thumbnail text-center">
            <div className="caption">
              <div className="container-fluid mt-12 d-flex flex-column w-25">
                <img
                  src={auto.imgUrl}
                  alt={auto.name}
                  className="card-img-top"
                  style={{
                    margin: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)",
                    objectFit: "scale-down",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <h3 className="text-center text-light">{auto.name}</h3>
              <p className="text-center text-light">
                Ciudad: {auto.location}
              </p>
              <p className="text-center text-light">
                Nombre cliente: {formData.nombre} {formData.apellido}
              </p>
              <p className="text-center text-light">
                Cédula: {formData.cedula}
              </p>
              <p className="text-center text-light">
                Ciudad de residencia: {formData.ubicacion}
              </p>
              <p className="text-center text-light">
                Número de contacto: {formData.telefono}
              </p>
              <p className="text-center text-light">
                Fecha de inicio: {auto.startDateAvailable}
              </p>
              <p className="text-center text-light">
                Fecha de finalización: {auto.endDateAvailable}
              </p>
              <p className="text-center text-light">
                Duración: {calculateDays()} días
              </p>
              <p className="text-center text-light">
                Precio total: ${calculateTotalPrice()}
              </p>
              <p className="text-center text-light" style={{ margin: "20px" }}>
                <MyButtonToHome />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
