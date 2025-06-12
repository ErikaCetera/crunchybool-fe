import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/autoplay";

function HomePage() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/animes")
      .then(response => setAnimeList(response.data))
      .catch(error => console.error("Errore nel recupero degli anime", error));
  }, []);

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="hero-section text-center">
          <h1 className="text-warning fw-bold display-3">CRUNCHYBOOL</h1>
          <p className="fs-4 text-light">
            Scopri gli anime più avvincenti e immergiti in mondi straordinari pieni di avventure!
          </p>
         <Link to="/anime" className="btn-animated">Scoprili tutti</Link>

        </div>

      </div>

      {/* Sezione scorrevole con autoplay */}
      {animeList.length > 0 && (
        <Swiper
          spaceBetween={10}
          slidesPerView={"auto"}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
          className="anime-swiper"
        >
          {animeList.map(anime => (
            <SwiperSlide key={anime.id} className="anime-card">
              <img src={`http://localhost:8080/${anime.image}`} alt={anime.title} className="anime-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default HomePage;





