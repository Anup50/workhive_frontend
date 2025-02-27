import { Bell, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle";
import { useAuth } from "../../../context/AuthContext";
import group83 from "/home/anup/Videos/Workhive_web/workhive_frontend/src/assets/logo/logo.png";

const UserNavbar = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const { logout } = useAuth();
  let navigate = useNavigate();
  const handleSearch = (e) => {
    let query = e.target.value;

    if (e.keyCode == 13 && query.length) {
      navigate(`user/search/${query}`);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1 gap-4">
        <a className="btn btn-ghost">
          <img src={group83} alt="logo" className="h-12 w-auto" />
        </a>
        <div className="input-group max-w-xl flex">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
            onKeyDown={handleSearch}
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
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
            <span>Jobs</span>
          </button>

          <button
            className={`btn btn-ghost gap-1 ${
              activeTab === "applications" ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => setActiveTab("applications")}
          >
            <FileText className="w-5 h-5" />
            <span>Applications</span>
          </button>

          <button
            className={`btn btn-ghost gap-1 ${
              activeTab === "notices" ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => setActiveTab("notices")}
          >
            <Bell className="w-5 h-5" />
            <span>Notices</span>
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
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
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

export default UserNavbar;
