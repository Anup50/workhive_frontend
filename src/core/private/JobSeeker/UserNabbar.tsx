import { Bell, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../../../components/ThemeToggle";
import { useAuth } from "../../../context/AuthContext";

const UserNavbar = () => {
  const { jobSeekerId } = useAuth();

  const [activeTab, setActiveTab] = useState("jobs");
  const { logout } = useAuth();
  let navigate = useNavigate();
  const handleSearch = (e) => {
    let query = e.target.value;

    if (e.keyCode == 13 && query.length) {
      navigate(`user/search/${query}`);
    }
  };
  const handleLogoClick = () => {
    navigate("/user");
    setActiveTab("jobs");
  };
  const handleApplicationsClick = () => {
    if (jobSeekerId) {
      navigate(`user/applications/${jobSeekerId}`); // Add jobSeekerId to route
      setActiveTab("applications");
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1 gap-4">
        <button onClick={handleLogoClick} className="btn btn-ghost text-xl">
          WorkHive
        </button>

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
            <span>Jobs</span>
          </button>

          <button
            className={`btn btn-ghost gap-1 ${
              activeTab === "applications" ? "border-b-2 border-primary" : ""
            }`}
            onClick={handleApplicationsClick} // Use new click handler
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
              <Link to="/user/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
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
