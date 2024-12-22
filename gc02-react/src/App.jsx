import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./views/HomePage";
import MovieDetail from "./views/DetailMoviePage";

export default function App() {
  return (
    <>
      <div className="p-16 min-h-screen bg-black">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
