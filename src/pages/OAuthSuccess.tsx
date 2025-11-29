// src/pages/OAuthSuccess.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      if (!localStorage.getItem("firstTimeUser")) {
        localStorage.setItem("firstTimeUser", "false");
      }

      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <p className="text-center mt-10">Logging you in...</p>;
};

export default OAuthSuccess;
