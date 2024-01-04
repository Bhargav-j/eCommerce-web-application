import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import "../components/styles/login_style.css";
import { Button, Col, Row } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { loginContext } from "./Context";
import { Navigate } from "react-router-dom";

const Login = ({ islogin }) => {
  const [firstName, setFirstName] = useState("Jeanne");
  const [lastName, setLastName] = useState("Halvorson");
  const [email, setEmail] = useState("kminchelle@qq.com");
  const [password, setPassword] = useState("0lelplR");
  const [gender, setGender] = useState("female");

  const [passVisible, setPassVisible] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const { setISLogin, setUserName, setAuth, setImg } = useContext(loginContext);

  const onLoginClick = async () => {
    setUserError("");
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    setGenderError("");

    setFirstName(() => firstName.trim());
    setLastName(() => lastName.trim());
    setEmail(() => email.trim());
    setPassword(() => password.trim());
    setGender(() => gender.trim());

    if ("" === firstName || "" === lastName) {
      setUserError("Enter both First Name & Last Name");
      return;
    }

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");

      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");

      return;
    }

    if ("" === gender) {
      setGenderError("Select the Gender");
    }

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR",
      }),
    })
      .then((user) => user.json())
      .then((user) => {
        setISLogin(true);
        setAuth(user["token"]);
        setUserName(user["username"]);
        setImg(user['image'])
      });
  };

  return !islogin ? (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="login-box p-4">
        <div className="h1 d-flex align-items-center justify-content-center pb-2">
          <span>Login</span>
        </div>
        <Row className="d-flex flex-md-row flex-column">
          <Col>
            <Form.Label htmlFor="firstname">First Name</Form.Label>
            <Form.Control
              type="text"
              id="firstname"
              aria-describedby="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label htmlFor="lastname">Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastname"
              aria-describedby="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
        </Row>

        <Form.Text
          id="name"
          className="pb-3 d-flex justify-content-center text-danger"
        >
          {userError}
        </Form.Text>

        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          id="email"
          aria-describedby="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Form.Text
          id="name"
          className="pb-3 d-flex justify-content-center text-danger"
        >
          {emailError}
        </Form.Text>

        <div className="d-flex gap-3 align-items-end">
          <div className="flex-fill">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type={!passVisible ? "password" : "text"}
              id="password"
              aria-describedby="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pb-2">
            {!passVisible ? (
              <EyeSlash size={25} onClick={() => setPassVisible(true)} />
            ) : (
              <Eye size={25} onClick={() => setPassVisible(false)} />
            )}
          </div>
        </div>

        <Form.Text
          id="name"
          className="pb-3 d-flex justify-content-center text-danger"
        >
          {passwordError}
        </Form.Text>

        <div className="py-3 px-5 d-flex justify-content-around">
          <Form.Check
            inline
            label="Male"
            name="group1"
            type="radio"
            id="male"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Female"
            name="group1"
            type="radio"
            id="female"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <Form.Text
          id="name"
          className="pb-3 d-flex justify-content-center text-danger"
        >
          {genderError}
        </Form.Text>

        <div className="d-grid px-5">
          <Button variant="primary" size="lg" onClick={onLoginClick}>
            Login
          </Button>
        </div>

        <Form.Text
          id="name"
          className="pb-3 d-flex justify-content-center text-danger"
        >
          {loginError}
        </Form.Text>

        <div>
          <p className="text-center">
            You can edit the data. But default login details are used from
            https://dummyjson.com/docs/auth
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Login;
