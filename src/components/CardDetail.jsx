import React from 'react';

function CardDetail({ image, title, originalTitle, genres, production, seasons, episode, rating, description }) {
    return (
        <div className="col-md-10">
            <div className="card bg-dark text-light shadow-lg p-4 d-flex flex-row align-items-center">
                <div className="col-md-4">
                    <img src={`http://localhost:8080/${image}`} className="img-fluid rounded shadow-lg" alt={title} />
                </div>
                <div className="col-md-8 ps-4">
                    <h2>{title}</h2>
                    <h5>{originalTitle}</h5>

                    <div className="mb-3">
                        {genres?.map((genre) => (
                            <span key={genre.id} className="badge bg-warning text-dark me-2">{genre.name}</span>
                        ))}
                    </div>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-dark text-light"><strong>Produzione:</strong> {production}</li>
                        <li className="list-group-item bg-dark text-light"><strong>Stagioni:</strong> {seasons}</li>
                        <li className="list-group-item bg-dark text-light"><strong>Episodi:</strong> {episode}</li>
                        <li className="list-group-item bg-dark text-light"><strong>Voto:</strong> ⭐ ⭐ ⭐ {rating}</li>
                    </ul>

                    <p className="mt-3"><strong>Trama:</strong> {description}</p>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
