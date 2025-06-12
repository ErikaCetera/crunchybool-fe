import axios from "axios";
import { useEffect, useState } from "react";

function Anime() {
    const [anime, setAnime] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genreList, setGenreList] = useState([]);
    const [loading, setLoading] = useState(true); // Stato per il caricamento

    // Funzione per ottenere tutti gli anime
    const fetchAnimes = () => {
        setLoading(true);
        axios.get("http://localhost:8080/api/animes")
            .then(response => setAnime(response.data))
            .catch(error => console.error("Errore nel recupero degli anime", error))
            .finally(() => setLoading(false)); // Fine caricamento
    };

    // Funzione per ottenere la lista dei generi
    const fetchGenres = () => {
        axios.get("http://localhost:8080/api/genres")
            .then(response => setGenreList(response.data))
            .catch(error => console.error("Errore nel recupero dei generi", error));
    };

    const searchByTitle = () => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/animes/search?name=${query}`)
            .then(response => setAnime(response.data))
            .catch(error => console.error("Errore nella ricerca per titolo:", error))
            .finally(() => setLoading(false));
    };

    const searchByGenre = () => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/animes/searchByGenre?genre=${selectedGenre}`)
            .then(response => setAnime(response.data))
            .catch(error => console.error("Errore nella ricerca per genere:", error))
            .finally(() => setLoading(false));
    };

    // Effetti per caricare i dati al montaggio del componente
    useEffect(() => {
        fetchAnimes();
        fetchGenres();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista Anime 🎬</h1>

            {/* Barra di ricerca con filtri separati */}
            <div className="row mb-4">
                {/* Filtro per titolo */}
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Cerca per titolo o titolo originale..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={searchByTitle}>
                        Cerca per Titolo
                    </button>
                </div>

                {/* Filtro per genere */}
                <div className="col-md-4">
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Tutti i generi</option>
                        {genreList.map(g => (
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-success w-100" onClick={searchByGenre}>
                        Filtra per Genere
                    </button>
                </div>
            </div>

            {/* Mostra il loader durante il caricamento */}
            {loading ? (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {anime.map((curanime) => (
                        <div className="col col-12 col-md-6 col-lg-3 mb-4" key={curanime.id}>
                            <div className="card shadow-lg border-0 rounded overflow-hidden mx-auto h-100">
                                <img src={`http://localhost:8080/${curanime.image}`} className="card-img-top img-fluid" style={{ maxHeight: '350px' }} alt={curanime.title} />
                                <div className="card-body text-center">
                                    <h4 className="card-title text-primary">{curanime.title}</h4>
                                    <h6 className="text-muted">{curanime.originalTitle}</h6>
                                </div>
                                <div className="card-footer bg-transparent border-0 text-center">
                                    <a href={`/anime/${curanime.id}`} className="btn btn-outline-primary btn-sm">Dettagli</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Anime;
