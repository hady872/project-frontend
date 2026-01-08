import { Routes, Route } from "react-router-dom";

import './App.css';
import First from './components/First';
import Second from './components/second';
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
        <Route path="/" element={<First />}></Route>
        <Route path="/login" element={<Second />}></Route>
        <Route path="/SignUp" element={<Three />}></Route>
        <Route path="/Forget" element={<Four />}></Route>
        <Route path="/otp" element={<Five/>}></Route>
        <Route path="/Reset" element={<Six />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/faq" element={<Faq/>}></Route>
        <Route path="/Welcome" element={<Welcome/>}></Route>
        <Route path="/aftermap" element={<AfterMap/>}></Route>
        <Route path="/book" element={<Book/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/donation" element={<Donation />}></Route>
        <Route path="/emergency" element={<Emergency />}></Route>
        <Route path="/request" element={<Request />}></Route>
        <Route path="/map" element={<Map />}></Route>
      </Routes>
    </div>
  );
}
//--------------------------------------------------------------

export default App;
