import { useEffect, useState } from "react";

export default function Summary() {
    const [total, setTotal] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
            const cartItems = JSON.parse(storedItems);
            const calculatedTotal = cartItems.reduce(
                (acc, item) => acc + (item.price * (item.quantity || 1)),
                0
            );
            setTotal(calculatedTotal);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username) {
            alert("Por favor ingresa tu nombre.");
            return;
        }

        const checkoutData = {
            username,
            total,
        };

        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        alert("Datos guardados correctamente.");
        setUsername('');
    };

    return (
        <div className="text-center mt-8 p-4 bg-gray-100 rounded shadow space-y-4">
            <h2 className="font-semibold mb-3">Total de la Compra</h2>
            <p className="text-xl font-bold">${total}</p>

            <form onSubmit={handleSubmit} className="space-y-2">
                <label className="block">
                    Nombre del Cliente:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded p-2 w-64 mx-auto mt-1 block"
                        placeholder="Ingresa tu nombre"
                    />
                </label>
                <button type="submit" className="bg-green-600 text-white rounded p-2 hover:bg-green-700">
                    Guardar Compra
                </button>
            </form>
        </div>
    );
}