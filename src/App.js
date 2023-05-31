import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./components/screen/homeScreen/HomeScreen";
import LoginScreen from "./components/screen/loginScreen/LoginScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./components/404/NotFound";
import { useSelector } from "react-redux";
import WatchScreen from "./components/screen/watchScreen/WatchScreen";
import SearchScreen from "./components/screen/searchScreen/SearchScreen";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="app_container">
        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && accessToken) {
      navigate("/auth", { replace: true });
    }
  }, [accessToken, loading, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomeScreen />
          </Layout>
        }
      />
      <Route path="/auth" element={<LoginScreen />} />

      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchScreen />
          </Layout>
        }
      />

      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchScreen />
          </Layout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
