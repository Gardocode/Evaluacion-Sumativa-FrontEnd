import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import AddItem from "../components/AddItem";
import { Link } from "react-router-dom";

export default function Home() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const storedItems = localStorage.getItem("cartItems");
        if(storedItems) {
            setCartItems(JSON.parse(storedItems));
        }

        fetch(`${API_URL}/products`)
        .then((res) => res.json())
        .then((data) => {
            setItems(data);
        })
        .catch((e) => console.e("Error al obtener productos", e));
    }, []);

    const handleAddToCart = (newProduct) => {
        const updatedCart = [...cartItems, newProduct];
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const handleDeleteFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Gestion de Productos</h1>
            <AddItem onAddItem={handleAddToCart} availableItems={items} cartItems={cartItems} />
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Productos en el Carrito</h2>
                {cartItems.length === 0 ? (
                    <p>No hay Productos en el carrito</p>
                ) :  (
                    <ItemList items={cartItems} onDelete={handleDeleteFromCart} showDeleteButton={true} />
                )}
            <br />
            <Link to="/checkout" className="text-blue-600 hover:underline">Ir al Carrito 🛒</Link>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Productos Disponibles</h2>
                <ul className="border rounded p-2 space-y-2">
                    {items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b py-1">
                            <span>-- Producto: {item.name} -- Valor: ${item.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}