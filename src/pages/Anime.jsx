import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

function Anime() {
    const [anime, setAnime] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genreList, setGenreList] = useState([]);
    const [loading, setLoading] = useState(true);

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

    //Cerca per titolo
    const searchByTitle = () => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/animes/search?name=${query}`)
            .then(response => setAnime(response.data))
            .catch(error => console.error("Errore nella ricerca per titolo:", error))
            .finally(() => setLoading(false));
    };

    //Filtra per genere
    const searchByGenre = () => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/animes/searchByGenre?genre=${selectedGenre}`)
            .then(response => setAnime(response.data))
            .catch(error => console.error("Errore nella ricerca per genere:", error))
            .finally(() => setLoading(false));
    };


    useEffect(() => {
        fetchAnimes();
        fetchGenres();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center text-warning display-3">Anime</h1>


            <section className="row mb-5 d-flex justify-content-between">

                {/* Filtro per titolo */}
                <div className="col-md-5 input-group w-25">
                    <input
                        type="text"
                        placeholder="Cerca titolo ..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control bg-dark text-light"
                    />
                    <button className="btn btn-outline-light ms-2" onClick={searchByTitle}>
                        Cerca
                    </button>
                </div>

                {/* Filtro per genere */}
                <div className="col-md-3 input-group w-25">
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="form-control bg-dark text-light"
                    >
                        <option value="">Tutti i generi</option>
                        {genreList.map(g => (
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                    </select>
                    <button className="btn btn-outline-light ms-2" onClick={searchByGenre}>
                        Filtra
                    </button>
                </div>
            </section>

           {/* Cards */}
            <section>
                {loading ? (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {anime.map((curanime) => (
                            <Card key={curanime.id} id={curanime.id}
                                image={curanime.image} title={curanime.title}
                                originalTitle={curanime.originalTitle} />

                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Anime;
