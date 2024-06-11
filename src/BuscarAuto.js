import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useState } from "react";
import DatosUsuario from "./DatosUsuario";
import { MyButtonToForm } from "./components/ButtonToform";
import "bootstrap/dist/css/bootstrap.min.css";
import Ticket from "./Ticket";
import axios, { Axios } from "axios";

function BuscarAuto() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [autosDisponibles, setAutosDisponibles] = useState([]);

  const manejarCambioCiudad = (event) => {
    setCiudadSeleccionada(event.target.value);
  };

  const manejarCambioFechaInicio = (event) => {
    setFechaInicio(event.target.value);
  };

  const manejarCambioFechaFin = (event) => {
    setFechaFin(event.target.value);
  };

  const buscarAutos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/cars');
  
      if (response.status === 200) {

        const autosFiltrados = response.data.filter(auto => 
          auto.location === ciudadSeleccionada &&
          auto.startDateAvailable < fechaFin && 
          fechaInicio < auto.endDateAvailable
        );
    
        setAutosDisponibles(autosFiltrados);
      }
    } catch (error) {
      console.error('GET request error:', error);
    }
  };

  const CarCard = ({ car }) => {
    const car2 = {
      id: car.id,
      name: car.name,
      model: car.model,
      year: car.year,
      location: car.location,
      pricePerDay: car.pricePerDay,
      startDateAvailable: fechaInicio,
      endDateAvailable: fechaFin,
      imgUrl: car.imgUrl
    };
    return (
      <div className="col-sm-6 col-md-10 mb-3">
        <div
          className="col-sm-6 col-md-11"
          style={{
            margin: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
          }}
        >
          <div className="thumbnail text-center">
            <img
              src={car.imgUrl}
              alt={car.model}
              className="card-img-top"
              style={{
                objectFit: "scale-down",
                borderRadius: "10px"
              }}
            />
            <div className="caption">
              <h2 className="text-center text-light">{car.name}</h2>
              <h3 className="text-center text-light">{car.model}</h3>
              <p className="text-center text-light">
                El auto tiene un precio de: ${car.pricePerDay}
              </p>
              <p className="text-center text-light">
                y esta listo para recoger en {car.location}
              </p>
              <p className="text-center text-light" style={{ margin: "20px" }}>
                <MyButtonToForm auto={car2} />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="container-fluid mt-12 d-flex flex-column min-vh-100 justify-content-center align-items-center"
              style={{
                backgroundImage: "linear-gradient(to right, #000000, #2b2b2b)",
              }}
            >
              <h1 className=" mb-4 text-light">RENTA DE AUTOS</h1>
              <div 
                className="container-fluid mt-12 d-flex flex-column min-vh-100 w-75 "
                style={{
                  margin: "20px"
                }}
              >
                <div className="row ">
                  <div className="col-md-4 mb-3 ">
                    <label htmlFor="ciudad" className="form-label text-light">
                      Ciudad:
                    </label>
                    <select
                      id="ciudad"
                      className="form-select "
                      value={ciudadSeleccionada}
                      onChange={manejarCambioCiudad}
                    >
                      <option value="">Seleccionar ciudad</option>
                      <option value="Bogotá">Bogotá</option>
                      <option value="Medellín">Medellín</option>
                      <option value="Santa Marta">Santa Marta</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor="fechaInicio"
                      className="form-label text-light"
                    >
                      Fecha inicio:
                    </label>
                    <input
                      type="date"
                      id="fechaInicio"
                      className="form-control"
                      value={fechaInicio}
                      onChange={manejarCambioFechaInicio}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="fechaFin" className="form-label text-light">
                      Fecha fin:
                    </label>
                    <input
                      type="date"
                      id="fechaFin"
                      className="form-control"
                      value={fechaFin}
                      onChange={manejarCambioFechaFin}
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button onClick={buscarAutos} className="btn btn-primary ">
                    Buscar
                  </button>
                </div>
                <h2 className="text-center mb-4 mt-4 text-light">
                  Autos disponibles
                </h2>
                <div className="row row-cols-4 mt-4 justify-content-center align-items-center">
                  {autosDisponibles.map((auto) => (
                    <div key={auto.id} className="col">
                      <CarCard car={auto} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        />
        <Route path="/form-data" element={<DatosUsuario />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BuscarAuto;
