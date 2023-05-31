import React, { useEffect } from "react";
import logo from "../../img/logo.webp";
import "./_style.scss";
import { FcGoogle } from "react-icons/fc";
import { ImHome } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken]);

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="logo" />
        <button onClick={handleLogin}>
          <FcGoogle size={23} /> Login With Google
        </button>
        <p>Watch videos -By- copyright © Design website</p>
        <br />
        <Link to="/">
          <ImHome size={23} /> Home
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
