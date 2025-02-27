import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  let navigate = useNavigate();
  const handleSearch = (e) => {
    let query = e.target.value;

    if (e.keyCode == 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };
  const handleLoginClick = () => {
    navigate("/signin"); // Navigate to the signin page
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1 gap-4">
        <a className="btn btn-ghost text-xl">WorkHive</a>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 md:w-64"
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        {/* Add the ThemeToggle component here */}
        <Button variant="secondary" onClick={handleLoginClick}>
          Login
        </Button>
        <Button variant="primary" onClick={handleSignUpClick}>
          Sign Up
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
