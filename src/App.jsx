import { Routes, Route } from "react-router-dom";
import ArtistsPage from "./pages/ArtistsPage";
import Navbar from "./components/Navbar/navbar";
import HomePage from "./pages/HomePage";
import ConcertPage from "./pages/ConcertPage";
import ArtistDetails from "./pages/ArtistDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditConcert from "./pages/EditConcert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProviderWrapper } from './Context/auth.context';
import ConcertDetails from "./pages/ConcertDetails";
import { SearchProvider } from "./Context/SearchContext";
function App() {

  return (
    <>
      <div className="card">
        <Navbar />



        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />

          <Route path="/concerts/:id" element={<ConcertDetails />} />
          <Route path="/concerts" element={<ConcertPage />} />
          <Route path="/concerts/edit/:id" element={<EditConcert />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>



        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      </div>
    </>
  )
}

export default App
