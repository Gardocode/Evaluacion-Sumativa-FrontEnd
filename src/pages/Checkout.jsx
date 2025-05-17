import { useEffect, useState } from "react";
import Summary from "../components/Summary";
import { Link } from "react-router-dom";

export default function Checkout() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("cartItems");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    if (!data) {
        return <p>No hay datos de compra guardados.</p>;
    }

    return (
        <div className="mt-8 p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-semibold mb-3">Resumen de la Compra</h2>
            <Summary />

            <Link to="/" className="text-blue-600 hover:underline">&larr; Volver al Menu Principal</Link>
        </div>
    );
}


