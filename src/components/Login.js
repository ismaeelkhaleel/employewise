import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login({ email, password });

      // Token store karo
      localStorage.setItem("token", response.data.token);
      login(response.data.token);

      // User ID fetch karo
      const usersResponse = await apiService.getUsers();
      const user = usersResponse.data.data.find((u) => u.email === email);

      if (user) {
        localStorage.setItem("userId", user.id); // User ID store karo
      }
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;