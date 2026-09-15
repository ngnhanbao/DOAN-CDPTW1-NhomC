import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("hotel_token");
      const savedUser = localStorage.getItem("hotel_user");

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          // Xác thực lại với backend
          const res = await axiosClient.get("/auth/profile");
          if (res?.data) {
            setUser(res.data);
            localStorage.setItem("hotel_user", JSON.stringify(res.data));
          }
        } catch (err) {
          console.error("Phiên đăng nhập đã hết hạn");
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    if (res?.success && res?.data) {
      localStorage.setItem("hotel_token", res.data.token);
      localStorage.setItem("hotel_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res?.message || "Đăng nhập không thành công");
  };

  const register = async (userData) => {
    const res = await axiosClient.post("/auth/register", userData);
    if (res?.success && res?.data) {
      localStorage.setItem("hotel_token", res.data.token);
      localStorage.setItem("hotel_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res?.message || "Đăng ký không thành công");
  };

  const logout = () => {
    localStorage.removeItem("hotel_token");
    localStorage.removeItem("hotel_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
