import React from "react";

const ReviewForm = ({ handleInputChange, data, submitReview }) => {
 return (
  <div className="row justify-content-center mt-5">
    <div className="col-md-8">
      <div className="card bg-dark text-light shadow-lg p-4">
        <h3 className="text-center text-warning mb-3">Lascia una recensione</h3>
        <form onSubmit={submitReview} className="mb-2">
          <div className="mb-3">
            <label className="form-label text-warning" htmlFor="username">
              Username
            </label>
            <input
              className="form-control bg-dark text-light"
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning" htmlFor="description">
              Descrizione
            </label>
            <textarea
              className="form-control bg-dark text-light"
              id="description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label text-warning" htmlFor="rating">
              Voto (1-5)
            </label>
            <input
              className="form-control bg-dark text-light"
              type="number"
              id="rating"
              name="rating"
              value={data.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-warning fw-bold text-dark shadow-lg">
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

};

export default ReviewForm;

