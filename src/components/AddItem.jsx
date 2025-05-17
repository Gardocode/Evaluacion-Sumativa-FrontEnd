import Button from "./Button";
import { useState } from "react";

export default function AddItem({ onAddItem, availableItems, cartItems }) {
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedProduct = availableItems.find(item => item.id === selectedProductId);
        if (!selectedProduct) {
            alert('Selecciona un producto válido');
            return;
        }

        if (quantity < 1) {
            alert('La cantidad debe ser al menos 1');
            return;
        }

        const alreadyInCart = cartItems.some(item => item.id === selectedProductId);
        if (alreadyInCart) {
            alert('Este producto ya está en el carrito');
            return;
        }

        onAddItem({
            ...selectedProduct,
            quantity
        });

        setSelectedProductId('');
        setQuantity(1);
    };

    return (
        <form 
            className="space-y-4 p-4 bg-white rounded shadow text-center w-64 mx-auto mt-1 block"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-bold">Agregar Producto al Carrito</h2>

            <div>
                <label htmlFor="product" className="block mb-1">Producto</label>
                <select
                    id="product"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                >
                    <option value="">- Selecciona un producto -</option>
                    {availableItems.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="quantity" className="block mb-1">Cantidad</label>
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border p-2 rounded w-full"
                />
            </div>

            <Button type="submit">
                Agregar al carrito
            </Button>
        </form>
    );
}
