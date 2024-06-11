import { useNavigate } from "react-router-dom";

export function MyButtonToForm({ auto }) {
    const navigate = useNavigate()

    function rentHandler(event) {
        event.preventDefault()
        navigate("/form-data", { state: { auto } })
    }

    return (
        <button onClick={rentHandler} className="btn btn-primary ">Rentar</button>
    );
    
}