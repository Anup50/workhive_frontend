import { useState } from "react";
import { toast } from "sonner";
import { loginUser } from "../../Api";
import logo from "../../assets/images/Group 82.png";
import google from "../../assets/images/Other-Pay-Method.png";
import signinimage from "../../assets/images/undraw_business_deal_re_up4u 2.png";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });

    const data = { email, password };

    loginUser(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          login(
            {
              email,
              id: "",
              name: "",
            },
            res.data.token,
            res.data.role
          );
        } else {
          console.log(res.data);
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
        {/* Left Side (Illustration) */}
        <div className="w-1/2 bg-blue-300 flex items-center justify-center">
          <div className="p-8">
            <img
              src={signinimage}
              alt="Sign In Illustration"
              className="h-72 mx-auto"
            />
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
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                value={password}
                onChange={handlePassword}
                type="password"
                placeholder="Enter password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  !password ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
            >
              Sign in
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-full bg-black text-white py-2 rounded-md font-semibold border border-gray-300 hover:bg-gray-600"
            >
              <img src={google} alt="Google Logo" className="h-5 w-5 mr-4" />
              Sign in with Google
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
