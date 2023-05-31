import React, { useState } from "react";
import "./_style.scss";
import logo from "../img/logo.webp";
import profile from "../img/profile.webp";

import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { MdExitToApp } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(!show);

  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons" onClick={handleClose}>
        {user ? (
          <>
            <img
              src={user?.photoURL ? user?.photoURL : profile}
              alt="profile"
            />
            <span>{user?.name}</span>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <img
                    width={40}
                    src={user?.photoURL ? user?.photoURL : profile}
                    alt="profile"
                  />
                  <span style={{ fontSize: "1rem" }}>{user?.name}</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>Do you want to log out?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  <MdExitToApp size={23} />
                  <span>LogOut</span>
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            <Link to="/auth">
              <FaUserCircle /> Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
