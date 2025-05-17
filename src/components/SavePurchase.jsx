import Button from "./Button";
import { useState } from "react";

export default function SavePurchase({onAddItem}) {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !price) {
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: productName, 
                price: price,
            })
        })

    if (response.ok) {
        const newProduct = await response.json();
        onAddItem(newProduct);
        setProductName('');
        setPrice('');
    }
    
    }

    return (
        <form 
            className={`
                space-y-4 p-4 bg-white rounded shadow    
            `}

            onSubmit={handleSubmit}
        >
            <h2
                className={`text-xl font-bold`}
            >Agregar Producto</h2>
            <div>
                <label htmlFor="productName" className="block mb-1">Nombre de Producto</label>
                <input
                    placeholder={"Nombre del producto"}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className={`border p-2 rounded w-50% focus:outline-none focus:ring-2 focus:ring-green-500`}                                                                                                                            
                />
            </div>
            <div>
                <label htmlFor="price" className="block mb-1">Precio de Producto</label>
                <input
                    placeholder={"Precio del producto"}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`border p-2 rounded w-50% focus:outline-none focus:ring-2 focus:ring-green-500`}                                                                                                                            
                />
            </div>
            <Button onClick={handleSubmit}>Agregar Producto</Button>
        </form>
    );
}