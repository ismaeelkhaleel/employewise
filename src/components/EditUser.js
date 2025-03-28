import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import Swal from "sweetalert2"; // Import SweetAlert2

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiService.getUserById(id);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateUser(id, user);

      // SweetAlert for success message
      Swal.fire({
        title: "Success!",
        text: "User updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/users"); // Navigate to Users List page
      });

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update user!",
        icon: "error",
      });
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;