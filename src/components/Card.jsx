import React from 'react';

function Card ({ id, image, title, originalTitle }) {
    return (
        <div className="col col-12 col-md-6 col-lg-3 mb-4">
            <div className="card card-list shadow-lg border-0 rounded overflow-hidden mx-auto h-100">
                <img src={`http://localhost:8080/${image}`} className="card-img-top img-fluid" style={{ maxHeight: '350px' }} alt={title} />
                <div className="card-body text-center">
                    <h4 className="card-title">{title}</h4>
                    <h6>{originalTitle}</h6>
                </div>
                <div className="card-footer bg-transparent border-0 text-center">
                    <a href={`/anime/${id}`} className="btn btn-outline-primary btn-sm">Dettagli</a>
                </div>
            </div>
        </div>
    );
};

export default Card;
