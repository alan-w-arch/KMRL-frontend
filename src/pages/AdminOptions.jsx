// src/pages/AdminOptions.jsx
import { useState } from "react";

export default function AdminOptions() {
  const [departmentName, setDepartmentName] = useState("");
  const [newUser, setNewUser] = useState({
    userId: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const handleCreateDepartment = () => {
    console.log("Create department:", departmentName);
  };

  const handleCreateUser = () => {
    console.log("Create user:", newUser);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 flex flex-col gap-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center md:text-left">
        Admin Options
      </h1>

      {/* Create Department */}
      <div className="w-full  mx-auto md:mx-0 p-6 md:p-8 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Create Department
        </h2>
        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
        />
        <button
          onClick={handleCreateDepartment}
          className="self-start px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Create Department
        </button>
      </div>

      {/* Create User */}
      <div className="w-full  mx-auto md:mx-0 p-6 md:p-8 bg-white rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Create User
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="User ID"
            value={newUser.userId}
            onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={newUser.phoneNumber}
            onChange={(e) =>
              setNewUser({ ...newUser, phoneNumber: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
          />
        </div>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full md:w-1/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
        >
          <option value="">Select Role</option>
          <option value="admin">Manager</option>
          <option value="user">Employee</option>
        </select>
        <button
          onClick={handleCreateUser}
          className="self-start px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition mt-2"
        >
          Create User
        </button>
      </div>
    </div>
  );
}
