import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="not-found my-5">
                <div className="flex justify-center items-center text-center p-4">
                    <div className="flex items-center justify-center flex-col">
                        <h2>Errore 404</h2>
                    <p className="text-xl md:text-4xl font-semibold text-slate-950 mt-3">Oops! Qualcosa è andato storto.</p>
                    <p className="text-sm md:text-xl text-slate-600"> Hai bussato alla porta giusta, ma nessuno sa dove sia quello che cerchi.</p>
                    </div>
                    <Link to="/" className="btn-animated">Torna alla Home</Link>

                </div>
            </div>
        </>
    )
}

export default NotFound;