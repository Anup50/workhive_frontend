import { useState } from "react";

const RoleSelector = ({ onSelect }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    onSelect(role); // Notify parent component about the selected role
  };

  return (
    <div className="flex space-x-4">
      <button
        type="button"
        className={`w-full py-2 rounded-md font-semibold ${
          selectedRole === "Business"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleRoleSelect("Business")}
      >
        Business
      </button>
      <button
        type="button"
        className={`w-full py-2 rounded-md font-semibold ${
          selectedRole === "Job Seeker"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleRoleSelect("Job Seeker")}
      >
        Job Seeker
      </button>
    </div>
  );
};

export default RoleSelector;
