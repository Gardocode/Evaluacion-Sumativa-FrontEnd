export default function Button({children, onClick, className}) {
    return (
        <button
            className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}