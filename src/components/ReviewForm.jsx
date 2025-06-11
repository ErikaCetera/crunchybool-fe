

function ReviewForm({ data, handleInputChange, submitReview }) {

    return (
        <div className="mt-4">
            <h3>Lascia una recensione ✍️</h3>
            <form onSubmit={submitReview}>
                <div className="mb-3">
                    <label className="form-label">Usename</label>
                    <input type="text" className="form-control"
                        value={data.username}
                        onChange={handleInputChange}
                        name="username"
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descrizione:</label>
                    <textarea className="form-control"
                        value={data.description}
                        onChange={handleInputChange}
                        name="description"
                        required>
                    </textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Voto:</label>
                    <select className="form-select"
                        value={data.rating}
                        onChange={handleInputChange}
                        name="rating">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success">Invia recensione</button>
            </form>
        </div>
    );
}

export default ReviewForm;
