import api from "../pages/interceptor/axiosInterceptor";

export const fetchAllMembers = async () => {
  const token = localStorage.getItem("token");

 // Decode JWT token
        const parts = token.split(".");
        if (parts.length !== 3) {
          console.error("Invalid token format");
          return null;
        }

        const decoded = JSON.parse(atob(parts[1]));
        console.log("Decoded token:", decoded);

        // Try different possible user ID fields
        const userId =
          decoded.userId || decoded.sub || decoded.id || decoded.NameIdentifier;
  try {
    const response = await api.get(`api/Searchmatch?userId=${userId}`);
    console.log("all members", response.data);
   var userProfiles = response.data;
    return userProfiles;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
