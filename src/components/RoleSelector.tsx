import React from "react";

type RoleSelectorProps = {
  onSelect: (roleId: string) => void;
};

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  const roles = {
    Business: "676f9a6ca2d59fd9940cf2b1",
    JobSeeker: "676f9a7aa2d59fd9940cf2b3",
  };

  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const handleRoleSelect = (role: keyof typeof roles) => {
    const roleId = roles[role];
    setSelectedRole(roleId);
    onSelect(roleId); // Pass the roleId to the parent
  };

  return (
    <div className="flex space-x-4">
      <button
        type="button"
        className={`w-full py-2 rounded-md font-semibold ${
          selectedRole === roles.Business
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
          selectedRole === roles.JobSeeker
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleRoleSelect("JobSeeker")}
      >
        Job Seeker
      </button>
    </div>
  );
};

export default RoleSelector;
