export default async function SavePurchase({ username, total }) {
    const API_URL = import.meta.env.VITE_API_URL;
    
    try {
        const response = await fetch(`${API_URL}/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientName: username,
                total: total,
            }),
        });

        if (!response.ok) {
            throw new Error("Error al guardar la compra.");
        }

        alert("Compra guardada exitosamente en la API.");
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al guardar la compra.");
    }
}
