import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anime from "./pages/Anime";
import HomePage from "./pages/HomePage";
import DetailAnime from "./pages/DetailAnime";

function App() {
    return (

        <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={ <HomePage/>}/>
                        <Route path="/anime" element={ <Anime/>}/>
                        <Route path="/anime/:id" element={ <DetailAnime/>}/>
                        

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
        </BrowserRouter>

    );
}

export default App;
