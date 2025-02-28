import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getEmployerId, getJobSeekerId } from "../Api"; // Ensure these endpoints exist

interface User {
  id: string;
  name: string;
  email: string;
}

type Role = "Admin" | "User" | "Employer";

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  jobSeekerId: string | null; // For jobseekers (role "User")
  employerId: string | null; // For employers (role "Employer")
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, token: string, role: Role) => void;
  logout: () => void;
  setEmployerId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [jobSeekerId, setJobSeekerId] = useState<string | null>(null);
  const [employerId, setEmployerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load stored auth data from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      const storedJobSeekerId = localStorage.getItem("jobSeekerId");
      const storedEmployerId = localStorage.getItem("employerId");

      if (storedUser && storedToken && storedRole) {
        const parsedRole = storedRole as Role;
        if (["Admin", "User", "Employer"].includes(parsedRole)) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setRole(parsedRole);
          if (parsedRole === "User" && storedJobSeekerId) {
            setJobSeekerId(storedJobSeekerId);
          }
          if (parsedRole === "Employer" && storedEmployerId) {
            setEmployerId(storedEmployerId);
          }
        } else {
          localStorage.removeItem("role");
        }
      }
    } catch (error) {
      console.error("Failed to load auth data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Fetch jobseekerId if the role is "User" and token is available
  useEffect(() => {
    const fetchJobSeekerId = async () => {
      try {
        const response = await getJobSeekerId();
        if (response && response.data) {
          const id = response.data.jobSeekerId;
          setJobSeekerId(id);
          localStorage.setItem("jobSeekerId", id);
        }
      } catch (error) {
        console.error("Error fetching jobseekerId:", error);
      }
    };

    if (token && role === "User" && !jobSeekerId) {
      fetchJobSeekerId();
    }
  }, [token, role, jobSeekerId]);
  // useEffect(() => {
  //   const fetchJobSeekerId = async () => {
  //     try {
  //       const response = await getJobSeekerId();
  //       const id = response?.data?.jobSeekerId;

  //       if (!id) {
  //         navigate("/user/form");
  //       } else if (id && id !== jobSeekerId) {
  //         // If jobSeekerId is different, update it
  //         setJobSeekerId(id);
  //         localStorage.setItem("jobSeekerId", id);
  //       }
  //     } catch (error) {
  //       navigate("/user/form");
  //       console.error("Error fetching jobseekerId:", error);
  //       navigate("/user/form"); // Redirect to form in case of error
  //     }
  //   };

  //   if (token && role === "User" && !jobSeekerId) {
  //     fetchJobSeekerId();
  //   }
  // }, [token, role, jobSeekerId, navigate]);
  // Removed jobSeekerId to prevent unnecessary re-fetching

  // Fetch employerId if the role is "Employer" and token is available
  useEffect(() => {
    const fetchEmployerId = async () => {
      try {
        const response = await getEmployerId();
        if (response && response.data) {
          const id = response.data.employerId;
          setEmployerId(id);
          localStorage.setItem("employerId", id);
        }
      } catch (error) {
        console.error("Error fetching employerId:", error);
      }
    };

    if (token && role === "Employer" && !employerId) {
      fetchEmployerId();
    }
  }, [token, role, employerId]);

  const isAuthenticated = user !== null && token !== null;

  // const login = (user: User, token: string, role: Role) => {
  // const decoded: any = jwtDecode(token);
  // setUserId(decoded.id);
  //   setUser(user);
  //   setToken(token);
  //   setRole(role);
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("role", role);
  //   localStorage.setItem("userId", decoded.id);

  //   // Remove any old role-specific ids (we'll fetch fresh ones)
  //   localStorage.removeItem("jobSeekerId");
  //   localStorage.removeItem("employerId");

  //   navigate(
  //     role === "Admin" ? "/admin" : role === "Employer" ? "/employer" : "/user"
  //   );
  // };
  // //Example: After login, check if jobseekerId is null

  const login = async (user: User, token: string, role: Role) => {
    setUser(user);
    setToken(token);
    setRole(role);
    const decoded: any = jwtDecode(token);
    setUserId(decoded.id);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", decoded.id);

    // If the role is 'User' and the jobseekerId is null, redirect to form
    if (role === "User" && jobSeekerId == "null") {
      navigate("/user/form");
    } else if (role === "Employer" && !employerId) {
      navigate("/employer/form"); // Redirect to employer profile completion
    } else {
      navigate(
        role === "Admin"
          ? "/admin"
          : role === "Employer"
          ? "/employer"
          : "/user"
      );
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    setJobSeekerId(null);
    setEmployerId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    localStorage.removeItem("jobSeekerId");
    localStorage.removeItem("employerId");
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      userId,
      jobSeekerId,
      employerId,
      setEmployerId,
      isAuthenticated,
      loading,
      login,
      logout,
    }),
    [user, token, role, jobSeekerId, employerId, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
