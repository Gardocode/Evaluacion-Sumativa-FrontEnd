import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import AddItem from "../components/AddItem";

export default function Home() {
    const [products, setProducts] = useState([]); // productos de la API
    const [cartItems, setCartItems] = useState([]); // productos en el carrito

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Cargar carrito desde localStorage
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }

        // Cargar productos desde API
        fetch(`${API_URL}/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((e) => console.error("Error al obtener productos", e));
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Gestión de Productos</h1>
            <AddItem onAddItem={handleAddToCart} />

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Carrito (Productos Agregados)</h2>
                {cartItems.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    <ItemList items={cartItems} onDelete={handleDeleteFromCart} />
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Productos Disponibles (API)</h2>
                <ul className="border rounded p-2 space-y-2">
                    {products.map((product) => (
                        <li key={product.id} className="flex justify-between items-center border-b py-1">
                            <span>{product.name} {product.description} {product.price}</span>
                            <button 
                                className="bg-green-600 text-sm p-1 hover:bg-green-700 text-white rounded"
                                onClick={() => handleAddToCart(product)}
                            >
                                Agregar al carrito
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Productos Disponibles</h2>
                <ul className="border rounded p-2 space-y-2">
                    {items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b py-1">
                            <span>{item.name} {item.description} {item.price}</span>
                            <Button 
                                onClick={() => handleAddToCart(item)}
                            >
                                Agregar al carrito
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
