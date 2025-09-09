import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //  Clear authentication token
    localStorage.removeItem("token"); 

    //  Optional: clear other auth data if any
    // localStorage.clear();

    //  Redirect to login page
    const timer = setTimeout(() => {
      navigate("/login");
    }, 500); // half a second delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
