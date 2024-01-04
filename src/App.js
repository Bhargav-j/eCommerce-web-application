import "./App.css";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import NavTab from "./components/NavTab";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import { loginContext } from "./components/Context";
import { useContext } from "react";

function App() {

  const {islogin, userName, img} = useContext(loginContext)

  return (
    <div className="App">
      <Router basename={"/eCommerce-web-application"}>
        {/* <NavTab /> */}
        <Routes>
          <Route
            element={
              <>
                <NavTab userName={userName} img={img}/>
                <ProtectedRoute islogin={islogin} />
              </>
            }
          >
            <Route path="/" excat element={<Home />} />
          </Route>
          <Route path="/login" element={<Login islogin={islogin}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
