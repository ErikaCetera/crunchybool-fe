import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

function DetailAnime() {



    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [data, setData] = useState({
        username:"",
        description:"",
        rating:1,
        
    });



    useEffect(() => {
        axios.get(`http://localhost:8080/api/animes/${id}`)
            .then(response => {
                console.log(response.data);
                setAnime(response.data);
            })
            .catch(error => console.error("Errore nel recupero dei dettagli dell'anime:", error));
    }, [id]);


    // Se l'anime non è ancora caricato, mostra un loader
    if (!anime) {
        return <div className="text-center mt-5">Caricamento...</div>;
    }

    const submitReview = (e) => {
    e.preventDefault();
    const reviewData = {
        ...data, // Mantiene username, description e rating
        anime: { id: id } // Associa la recensione all'anime
    };

    axios.post("http://localhost:8080/api/reviews", reviewData)
        .then(response => {
            console.log("Recensione salvata!", response.data);
            setData(data); 
        })
        .catch(error => console.error("Errore nell'inserimento della recensione:", error));
};


    // Gestione del cambiamento degli input
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.value);
    
    setData(prevData => ({
        ...prevData,
        [name]: value
    }));
    console.log("Stato aggiornato:", name, value);
};



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img src={`http://localhost:8080/${anime.image}`} className="img-fluid rounded" alt={anime.title} />
                </div>
                <div className="col-md-8">
                    <h1>{anime.title}</h1>
                    <h4 className="text-muted">{anime.originalTitle}</h4>
                    {anime.genres && anime.genres.map((genre) => (
                        <span key={genre.id} className="badge bg-secondary">{genre.name}</span>
                    ))}

                    <p><strong>Descrizione:</strong> {anime.description}</p>
                    <a href="/" className="btn btn-primary">Torna alla lista</a>
                </div>
            </div>

            {/* Sezione recensioni */}
            <div className="mt-5">
                <h2>Recensioni 📝</h2>
                {anime.reviews && anime.reviews.length > 0 ? (
                    <ul className="list-group">
                        {anime.reviews.map((review) => (
                            <li key={review.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{review.username}</strong>: {review.description}
                                </div>
                                <div>
                                    ⭐ {review.rating}/5
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">Nessuna recensione disponibile.</p>
                )}
            </div>

            <ReviewForm
            handleInputChange={handleInputChange}
            data={data}
            submitReview={submitReview}/>

        </div>
        
    );

}

export default DetailAnime;