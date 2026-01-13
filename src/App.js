import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import First from "./components/First";
import Second from "./components/second";
import Three from "./components/Three";
import Four from "./components/Four";
import Five from "./components/Five";
import Six from "./components/six";

import Home from "./components/Home";
import About from "./components/About";
import Faq from "./components/Faq";
import Welcome from "./components/Welcome";
import AfterMap from "./components/AfterMap";
import Book from "./components/Book";
import Profile from "./components/Profile";
import Donation from "./components/Donation";
import Emergency from "./components/Emergency";
import Request from "./components/Request";
import Map from "./components/Map";

//--------------------------------------------------------------
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/login" element={<Second />} />
        <Route path="/SignUp" element={<Three />} />
        <Route path="/Forget" element={<Four />} />
        <Route path="/otp" element={<Five />} />
        <Route path="/Reset" element={<Six />} />

        {/* ✅ User Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allow={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />

        <Route
          path="/Welcome"
          element={
            <ProtectedRoute allow={["user", "hospital"]}>
              <Welcome />
            </ProtectedRoute>
          }
        />

        <Route path="/aftermap" element={<AfterMap />} />

        <Route
          path="/book"
          element={
            <ProtectedRoute allow={["user"]}>
              <Book />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allow={["user", "hospital"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donation"
          element={
            <ProtectedRoute allow={["user"]}>
              <Donation />
            </ProtectedRoute>
          }
        />

        {/* ✅ Hospital Request Form */}
        <Route
          path="/emergency"
          element={
            <ProtectedRoute allow={["hospital"]}>
              <Emergency />
            </ProtectedRoute>
          }
        />

        {/* ✅ User Requests List (Donate/Call) */}
        <Route
          path="/request"
          element={
            <ProtectedRoute allow={["user"]}>
              <Request />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute allow={["user", "hospital"]}>
              <Map />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
//--------------------------------------------------------------

export default App;