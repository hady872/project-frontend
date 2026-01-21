// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
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
import AfterMap from "./components/AfterMap";
import Book from "./components/Book";
import Profile from "./components/Profile";
import Donation from "./components/Donation";
import Emergency from "./components/Emergency";
import Request from "./components/Request";
import Map from "./components/Map";

import Donors from "./components/Donors";

// ---------------- Helpers (داخل نفس الملف) ----------------
const getAccountType = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "";
    const u = JSON.parse(raw);
    return String(u?.accountType || u?.AccountType || "")
      .toLowerCase()
      .trim();
  } catch {
    return "";
  }
};

const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

// Redirect ذكي حسب حالة الدخول ونوع الحساب
const SmartRedirect = ({ whenLoggedOut = "/login" }) => {
  const logged = isLoggedIn();
  const type = getAccountType();

  if (!logged) return <Navigate to={whenLoggedOut} replace />;

  // لو Hospital
  if (type === "hospital") return <Navigate to="/emergency" replace />;

  // default User
  return <Navigate to="/home" replace />;
};

//--------------------------------------------------------------
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Landing */}
        <Route path="/" element={<First />} />

        {/* Auth (نعمل alias للـ paths المختلفة عشان ميبقاش فيه تلخبط) */}
        <Route path="/login" element={<Second />} />
        <Route path="/Login" element={<Navigate to="/login" replace />} />

        <Route path="/signup" element={<Three />} />
        <Route path="/SignUp" element={<Navigate to="/signup" replace />} />

        <Route path="/forget" element={<Four />} />
        <Route path="/Forget" element={<Navigate to="/forget" replace />} />

        <Route path="/otp" element={<Five />} />
        <Route path="/Otp" element={<Navigate to="/otp" replace />} />

        <Route path="/reset" element={<Six />} />
        <Route path="/Reset" element={<Navigate to="/reset" replace />} />

        {/* ✅ إلغاء Welcome نهائيًا: أي زيارة له تتحول مباشرة */}
        <Route path="/welcome" element={<SmartRedirect whenLoggedOut="/login" />} />
        <Route path="/Welcome" element={<Navigate to="/welcome" replace />} />

        {/* ✅ User Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allow={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* صفحات عامة (هنسيبها زي ما هي دلوقتي، التحكم الحقيقي للـ Hospital هنظبطه في Navbar بعدين) */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />

        {/* صفحة AfterMap (مفروض تظهر للـ user فقط في النهاية، هنظبطها بعدين) */}
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

        {/* ✅ Donors Page (حالياً Hospital فقط — هنغيرها لاحقًا حسب طلبك إنها تبقى لكل السيستم) */}
        <Route
          path="/donors"
          element={
            <ProtectedRoute allow={["hospital"]}>
              <Donors />
            </ProtectedRoute>
          }
        />

        {/* ✅ User Requests List */}
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

        {/* ✅ أي Route غلط */}
        <Route path="*" element={<SmartRedirect whenLoggedOut="/login" />} />
      </Routes>
    </div>
  );
}
//--------------------------------------------------------------

export default App;