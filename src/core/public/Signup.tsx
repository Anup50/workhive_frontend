import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import icons for password toggle
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import logo from "../..//assets/images/Group 82.png";
import google from "../..//assets/images/Other-Pay-Method.png";
import { registerUser } from "../../Api";
import teamwork from "../../assets/images/teamwork.png";
import RoleSelector from "../../components/RoleSelector";

const SignUpPage = () => {
  const [roleId, setRoleId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility
  const navigate = useNavigate();

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const validateForm = () => {
    if (!name) {
      toast.error("Full Name is required.");
      return false;
    }
    if (!email) {
      toast.error("Email is required.");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      toast.error("Password is required.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!roleId) {
      toast.error("Role is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = { name, email, password, role: roleId };

    registerUser(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/signin");
        } else {
          toast.error("Internal Server Error");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong! Please try again later.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-1/2 bg-blue-300 flex items-center justify-center">
          <div className="p-8">
            <img src={teamwork} alt="bob" className="h-72 mx-auto" />
          </div>
        </div>

        <div className="w-1/2 p-8">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="WorkHive Logo"
              className="h-28 w-auto mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome to WorkHive!
            </h2>
          </div>
          <div className="my-6">
            <RoleSelector onSelect={(id) => setRoleId(id)} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                value={name}
                onChange={handleFullName}
                type="text"
                placeholder="Full Name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  !name ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                value={email}
                onChange={handleEmail}
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  !email ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                value={password}
                onChange={handlePassword}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  password.length < 8 ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3  pt-5 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                style={{ height: "100%" }}
              >
                {showPassword ? (
                  <EyeIcon size={20} className="text-white" />
                ) : (
                  <EyeOffIcon size={20} className="text-white" />
                )}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={handleConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  confirmPassword !== password
                    ? "border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 pt-5 transform -translate-y-1/2 flex items-center justify-center"
                style={{ height: "100%" }}
              >
                {showConfirmPassword ? (
                  <EyeIcon size={20} className="text-white" />
                ) : (
                  <EyeOffIcon size={20} className="text-white" />
                )}
              </button>
            </div>

            <button
              type="submit"
              data-testid="signup-button"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
            >
              Sign up
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-full bg-black text-white py-2 rounded-md font-semibold border border-gray-300 hover:bg-gray-600"
            >
              <img src={google} alt="Google Logo" className="h-5 w-5 mr-4" />
              Sign up with Google
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default SignUpPage;
