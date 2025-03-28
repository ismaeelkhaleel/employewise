import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2"; // Import SweetAlert2

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    apiService
      .getUsers()
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    setLoggedInUserId(userIdFromStorage ? parseInt(userIdFromStorage) : null);
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiService.deleteUser(id);
          setUsers(users.filter((user) => user.id !== id));

          // Success alert
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete user.", "error");
          console.error("Error deleting user:", error);
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Users List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img src={user.avatar} style={{ width: "50px", borderRadius: "50%" }} alt={user.last_name} />
              </td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.email}</td>
              <td>
                {loggedInUserId === user.id && (
                  <Link to={`/edit/${user.id}`} className="btn btn-primary btn-sm me-2">
                    Edit
                  </Link>
                )}
                {loggedInUserId === user.id && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;