import Button from "./Button";

export default function ItemList({items, onDelete, showDeleteButton = false}) {
    return (
        <div className="space-y-2">
            <ul className="border rounded p-2">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b py-1">
                        <span>-- Producto: {item.name} -- Cantidad: {item.quantity} -- Subtotal: {item.quantity * item.price} </span>
                        {showDeleteButton && (
                            <div className="space-x-2">
                                <Button onClick={() => onDelete(item.id) } className="bg-red-600 text-sm p-1 hover:bg-red-700">Eliminar Producto</Button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}