import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }
  }, []);

  const getCookie = (name) => {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [k, v] = el.split("=");
      cookie[k.trim()] = v;
    });
    return cookie[name];
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const deleteCookie = (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  const loginAction = async (data) => {
    try {
      const { username, password } = data;
      const url = `https://api.bin.net.tr:8080/api/auth/generateToken?username=${username}&password=${password}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.data) {
        setUser({ token: res.data });
        setCookie("token", res.data, 1); // Save token to cookies for 1 day
        navigate("/dashboard");
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    deleteCookie("token");
    navigate("/login");
  };

 

  // If user is authenticated, render children
  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
