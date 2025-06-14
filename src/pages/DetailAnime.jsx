import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { Link } from "react-router-dom";
import CardDetail from "../components/CardDetail";

function DetailAnime() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        username: "",
        description: "",
        rating: 1,
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/animes/${id}`)
            .then(response => {
                console.log(response.data);
                setAnime(response.data);
            })
            .catch(error => console.error("Errore nel recupero dei dettagli dell'anime:", error))
            .finally(() => setLoading(false));
    }, [id]);

    const submitReview = (e) => {
        e.preventDefault();
        const reviewData = {
            ...data,
            anime: { id: id }
        };

        axios.post("http://localhost:8080/api/reviews", reviewData)
            .then(response => {
                console.log("Recensione salvata!", response.data);
                setData(data);
            })
            .catch(error => console.error("Errore nell'inserimento della recensione:", error));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(event.value);

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log("Stato aggiornato:", name, value);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </div>
            </div>
        );
    }

    return (

        <div className="container mt-5 anime-detail">
            <div className="mt-4">
                <Link to="/anime" className="btn btn-orange mb-4 ">Torna alla lista</Link>
            </div>
            <div className="row justify-content-center mb-5">

                {/* Card  Dettaglio */}
                <section className="row justify-content-center mb-5">
                    <CardDetail
                        image={anime.image}
                        title={anime.title}
                        originalTitle={anime.originalTitle}
                        genres={anime.genres}
                        production={anime.production}
                        seasons={anime.seasons}
                        episode={anime.episode}
                        rating={anime.rating}
                        description={anime.description}
                    />
                </section>

                <hr />

                {/* Sezione Recensioni */}
                <section className="mt-5 reviews-section">
                    <h2 className="text-center text-warning mb-4">Recensioni</h2>

                    {anime.reviews?.length > 0 ? (
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="card bg-dark text-light shadow-lg p-4">
                                    {anime.reviews.map((review) => (
                                        <div key={review.id} className="card-body border-bottom  pb-3">
                                            <h5 className="card-title text-info">{review.username}</h5>
                                            <p className="card-text">{review.description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="badge fs-6">⭐ {review.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h5 className="text-danger">✨ Sii il primo a lasciare una recensione! ✨</h5>
                        </div>
                    )}


                    <hr />

                    {/* Form Recensione */}
                    <ReviewForm handleInputChange={handleInputChange} data={data} submitReview={submitReview} />
                </section>
            </div>
        </div>
    );


}

export default DetailAnime;
