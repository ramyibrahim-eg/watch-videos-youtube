import React from "react";
import Button from "react-bootstrap/Button";

const LoadingSpinnerButton = ({ title, loading, onClick }) => {
  return (
    <Button onClick={onClick} className="btn btn-danger">
      {loading ? (
        <div className="spinner-border text-dark d-block mx-auto"></div>
      ) : (
        title
      )}
    </Button>
  );
};

export default LoadingSpinnerButton;
