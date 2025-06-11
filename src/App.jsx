import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Anime from "./pages/Anime";
import HomePage from "./pages/HomePage";
import DetailAnime from "./pages/DetailAnime";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/anime" element={<Anime />} />
                        <Route path="/anime/:id" element={<DetailAnime />} />


                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
