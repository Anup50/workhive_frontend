// import React, { useEffect, useState } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { Toaster } from "sonner";
// import { AuthProvider } from "./context/AuthContext";
// import Home from "./core/public/Home";
// import SignInPage from "./core/public/Signin";
// import SignUpPage from "./core/public/Signup";

// const App: React.FC = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDark]);

//   return (
//     <Router>
//       <AuthProvider>
//         <Toaster />
//         <Routes>
//           <Route
//             path="/"
//             element={<Home toggleTheme={() => setIsDark(!isDark)} />}
//           />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/signin" element={<SignInPage />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;
import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

// Lazy-loaded components
const Home = lazy(() => import("./core/public/Home"));
const SignInPage = lazy(() => import("./core/public/Signin"));
const SignUpPage = lazy(() => import("./core/public/Signup"));

const User = lazy(() => import("./core/private/JobSeeker/Home"));
// const Dashboard = lazy(() => import("./core/private/Admin/Dashboard"));
// const Customer = lazy(() => import("./core/private/Admin/Customer"));
// const User = lazy(() => import("./core/private/Admin/User"));

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<User />}>
                {/* <Route index element={<Dashboard />} />
                <Route path="customer" element={<Customer />} />
                <Route path="user" element={<User />} /> */}
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
