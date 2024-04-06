import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
import Home from "./pages/home";
import About from "./pages/about";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import Header from "./components/header";
import ContextProvider from "./context/context.js";
import AllMaterialsPage from "./components/AllMaterial.jsx";



function App() {
  return (
    <>
      <Router>
        <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/sign-in" element={<Signin />}/>
          <Route path="/sign-up" element={<Signup /> }/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/AllMaterial" element={<AllMaterialsPage />} />
          <Route path="/MyMaterial" element={<AllMaterialsPage />} />
        </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
