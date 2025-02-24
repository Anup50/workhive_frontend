import Button from "./Button";
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1 gap-4">
        <a className="btn btn-ghost text-xl">daisyUI</a>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 md:w-64"
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        {/* Add the ThemeToggle component here */}
        <Button variant="secondary">Login</Button>
        <Button variant="primary">Sign Up</Button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
