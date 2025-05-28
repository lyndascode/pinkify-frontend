import { Routes, Route } from "react-router-dom";
import ArtistsPage from "./pages/ArtistsPage";
import Navbar from "./components/Navbar/navbar";
import HomePage from "./pages/HomePage";
import ConcertDetail from "./pages/ConcertDetail";
import ConcertPage from "./pages/ConcertPage";
import ArtistDetails from "./pages/ArtistDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
function App() {

  return (
    <>
      <div className="card">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />

          <Route path="/concerts/:id" element={<ConcertDetail />} />
          <Route path="/concerts" element={<ConcertPage />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
    </>
  )
}

export default App
