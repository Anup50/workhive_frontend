import { useForm } from "react-hook-form";
import teamwork from "../../assets/images/teamwork.png";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side (Illustration) */}
        <div className="w-1/2 bg-blue-300 flex items-center justify-center">
          <div className="p-8">
            <img src={teamwork} alt="bob" className="h-72 mx-auto" />
          </div>
        </div>

        <div className="w-1/2 p-8">
          <div className="text-center mb-8">
            <img src="" alt="WorkHive Logo" className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome to WorkHive!
            </h2>
          </div>
          <div className="my-6">
            <div className="flex space-x-4">
              <button
                type="button"
                className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300"
              >
                Business
              </button>
              <button
                type="button"
                className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300"
              >
                Job Seeker
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                type="text"
                placeholder="Full Name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.fullName ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Enter password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
            >
              Sign up
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
