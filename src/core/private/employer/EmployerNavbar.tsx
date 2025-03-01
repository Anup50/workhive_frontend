import { Briefcase, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle";
import { useAuth } from "../../../context/AuthContext";

const EmployerNavbar = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    if (e.keyCode === 13 && query.length) {
      navigate(`employer/search/${query}`);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1 gap-4">
        <a className="btn btn-ghost text-xl">WorkHive</a>

        <div className="input-group max-w-xl flex">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="flex-none gap-4">
        <div className="flex gap-2">
          <button
            className={`btn btn-ghost gap-1 ${
              activeTab === "jobs" ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="w-5 h-5" />
            <span>Manage Jobs</span>
          </button>

          <button
            className={`btn btn-ghost gap-1 ${
              activeTab === "applications" ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => setActiveTab("applications")}
          >
            <FileText className="w-5 h-5" />
            <span>Manage Applications</span>
          </button>

          <button
            className="btn btn-ghost gap-1"
            onClick={() => navigate("/employer/add")}
          >
            <Plus className="w-5 h-5" />
            <span>Add Job</span>
          </button>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Profile" src="" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default EmployerNavbar;
