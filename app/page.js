"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!username || !name || !email) return;

    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, email }),
    });

    if (response.ok) {
      setMessage("User added successfully");
      setEmail("");
      setUsername("");
      setName("");
      fetchUsers();
    } else {
      setMessage("Failed to add user");
    }
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage("User deleted successfully");
      fetchUsers();
    } else {
      setMessage("Failed to delete user");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !username || !name || !email) return;

    const response = await fetch(`http://localhost:8000/api/users/${selectedUserId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, email }),
    });

    if (response.ok) {
      setMessage("User updated successfully");
      setSelectedUserId(null);
      setEmail("");
      setUsername("");
      setName("");
      fetchUsers();
    } else {
      setMessage("Failed to update user");
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/api/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="flex items-center justify-center mb-24 mt-8">Simple CRUD</h1>

      <div>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div>
            <h1>Enter the user full name</h1>
            <input
              type="text"
              placeholder="Enter your name here"
              className="p-3 rounded-md mr-2 text-gray-500"
              value={name || ""} // Make sure value is never undefined
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <h1>Enter the email</h1>
            <input
              type="email"
              placeholder="Enter your email here"
              className="p-3 rounded-md mr-2 text-gray-500"
              value={email || ""} // Ensure this value is not undefined
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <h1>Enter the username</h1>
            <input
              type="text"
              placeholder="Enter username"
              className="p-3 rounded-md mr-2 text-gray-500"
              value={username || ""} // Ensure this value is not undefined
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {!selectedUserId ? (
            <button onClick={handleAddUser} className="p-2 text-green-500">
              Add User
            </button>
          ) : (
            <button onClick={handleUpdateUser} className="p-2 text-blue-500">
              Update User
            </button>
          )}
        </div>

        <div className="flex justify-center flex-col">
          <h2 className="mt-8">List of All Users</h2>
          {message && <p className="mt-4">{message}</p>}
          <ul className="mt-4">
            {users.map((user) => (
              <li key={user.id} className="mb-4 flex items-center gap-4">
                {user.user} - {user.username} - {user.email}
                <button
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setName(user.user || ""); 
                    setUsername(user.username || ""); 
                    setEmail(user.email || "");
                  }}
                  className="p-2 text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
