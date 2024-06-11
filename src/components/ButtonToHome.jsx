import { useNavigate } from "react-router-dom";


export function MyButtonToHome({ auto }) {
    const navigate = useNavigate()

    function rentHandler(event) {
        event.preventDefault()
        navigate("/")
    }

    return (
        <button onClick={rentHandler} className="btn btn-primary ">FINALIZAR</button>
    );
    
}