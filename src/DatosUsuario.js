import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { Axios } from "axios";

const createCustomer = (auto , customer) => {
  const customerData = {
    dni: customer.cedula,
    name: customer.nombre,
    lastName: customer.apellido,
    location: customer.ubicacion,
    phoneNumber: customer.telefono,
    address: customer.direccion
  };

  const jsonData = JSON.stringify(customerData);

  axios.post('http://localhost:8080/api/v1/customers', jsonData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      console.log(response.data);
      return(
        createRent(auto, response.data)
      );
      
    })
    .catch((error) => {
      console.log(error);
    });
};

const createRent = (auto, customer) => {
  const startDate = new Date(auto.startDateAvailable);
  const endDate = new Date(auto.endDateAvailable);

  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const total = days * auto.pricePerDay;

  console.log(new Date(total).getDate());
  
  const rentData = {
    carId: auto.id,
    customerId: customer.id,
    startDate: auto.startDateAvailable,
    endDate: auto.endDateAvailable,
    totalPrice: total
  };

  const jsonData = JSON.stringify(rentData);
  console.log(jsonData);

  axios.post('http://localhost:8080/api/v1/rents', jsonData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    return(
      rentData
    );
};
 
const DatosUsuario = () => {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [formularioCompleto, setFormularioCompleto] = useState(false);
  const { auto } = useLocation().state;
  const navigate = useNavigate();

  const manejarCambioCedula = (event) => {
    const nuevaCedula = event.target.value.trim(); // Elimina espacios en blanco

    if (nuevaCedula.length > 0) {
      setCedula(nuevaCedula);
      const todosLlenos = nombre && apellido && ubicacion && telefono && direccion;
      setFormularioCompleto(todosLlenos);
    } else {
      console.error("El nombre no puede estar vacío");
    }
  };

  const manejarCambioNombre = (event) => {
    const nuevoNombre = event.target.value.trim(); // Elimina espacios en blanco

    if (nuevoNombre.length > 0) {
      setNombre(nuevoNombre);
      const todosLlenos = nombre && apellido && ubicacion && telefono;
      setFormularioCompleto(todosLlenos);
    } else {
      console.error("El nombre no puede estar vacío");
    }
  };

  const manejarCambioApellido = (event) => {
    const nuevoApellido = event.target.value.trim(); 

    if (nuevoApellido.length > 0) {
      setApellido(nuevoApellido);
      const todosLlenos = nombre && apellido && ubicacion && telefono;
      setFormularioCompleto(todosLlenos);
    } else {
      console.error("El apellido no puede estar vacío");
    }
  };

  const manejarCambioUbicacion = (event) => {
    const nuevaUbicacion = event.target.value.trim();

    if (nuevaUbicacion.length > 0) {
      setUbicacion(nuevaUbicacion);
      const todosLlenos = nombre && apellido && ubicacion && telefono;
      setFormularioCompleto(todosLlenos);
    } else {
      console.error("La ubicacion no puede estar vacía");
    }
  };

  const manejarCambioTelefono = (event) => {
    const nuevoTelefono = event.target.value.trim();
    
    if ((nuevoTelefono.length > 0 )) {
      setTelefono(nuevoTelefono);
      const todosLlenos = nombre && apellido && ubicacion && telefono;
      setFormularioCompleto(todosLlenos);
    } else {
      console.error("La ubicacion no puede estar vacía");
    }
  };

  const manejarCambioDireccion = (event) => {
    const nuevaDireccion = event.target.value.trim();

    if (nuevaDireccion.length > 0) {
      setDireccion(nuevaDireccion);
      const todosLlenos = cedula && nombre && apellido && ubicacion && telefono;
      setFormularioCompleto(todosLlenos);
    } else {
      console.error("El nombre no puede estar vacío");
    }
  };

  const enviarFormulario = (event) => {
    event.preventDefault(); // Evita la recarga de la página

    // Simulación de envío de datos (reemplazar con API)
    console.log("Formulario enviado:");
    console.log(`Cédula: ${cedula}`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Apellido: ${apellido}`);
    console.log(`Ubicación: ${ubicacion}`);
    console.log(`Teléfono: ${telefono}`);
    console.log(`Dirección: ${direccion}`);
    console.log(`Auto: ${auto.name} - ${auto.location}`);

    const formData = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ubicacion: ubicacion,
      telefono: telefono,
      direccion: direccion
    };
    
    const rent = createCustomer(auto, formData);

    navigate("/ticket", { state: {auto, formData, rent } });
  };

  return (
    <div
      className="container-fluid mt-12 d-flex flex-column min-vh-100 "
      style={{
        backgroundImage: "linear-gradient(to right, #000000, #2b2b2b)",
      }}
    >
      <h1 className="text-center mb-4 text-light" style={{ margin: "60px" }}>
        RENTA DE AUTOS
      </h1>
      <h2 className="text-center mb-4 text-light" style={{ margin: "40px" }}>
        Datos de usuario
      </h2>
      <form
        onSubmit={enviarFormulario}
        className="md-6 d-flex flex-column align-items-center"
        style={{ margin: "40px" }}
      >
        <div className="form-group d-flex justify-content-center">
          <label htmlFor="cedula" className="form-label text-light">
            Cédula:
            <input
              type="number"
              className="form-control w-120"
              id="direccion"
              value={cedula}
              onChange={manejarCambioCedula}
            />
          </label>
        </div>
        <div className="form-group d-flex justify-content-center">
          <label htmlFor="nombre" className="form-label text-light">
            Nombre:
            <input
              type="text"
              className="form-control w-120"
              id="nombre"
              value={nombre}
              onChange={manejarCambioNombre}
            />
          </label>
        </div>
        <div className="form-group d-flex justify-content-center">
          <label htmlFor="apellido" className="form-label text-light">
            Apellido:
            <input
              type="text"
              className="form-control w-120"
              id="apellido"
              value={apellido}
              onChange={manejarCambioApellido}
            />
          </label>
        </div>
        <div className="form-group d-flex justify-content-center">
          <label htmlFor="ubicacion" className="form-label text-light">
            Ubicación:
            <input
              type="text"
              className="form-control w-120"
              id="ubicacion"
              value={ubicacion}
              onChange={manejarCambioUbicacion}
            />
          </label>
        </div>
        <div className="form-group d-flex justify-content-center">
          <label htmlFor="telefono" className="form-label text-light">
            Teléfono:
            <input
              type="number"
              className="form-control w-120"
              id="telefono"
              value={telefono}
              onChange={manejarCambioTelefono}
            />
          </label>
        </div>
        <div className="form-group d-flex justify-content-center">
          <label htmlFor="direccion" className="form-label text-light">
            Dirección:
            <input
              type="text"
              className="form-control w-120"
              id="direccion"
              value={direccion}
              onChange={manejarCambioDireccion}
            />
          </label>
        </div>
        <p style={{ margin: "20px" }}>
          <button type="submit" disabled={!formularioCompleto} className="btn btn-primary">
            Enviar formulario
          </button>
        </p>
      </form>
    </div>
  );
};

export default DatosUsuario;
