import api from "../pages/interceptor/axiosInterceptor";

export const fetchAllMembers = async () => {
  try {
    const response = await api.get(`api/members/allmembers`);
    console.log("all members", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};
