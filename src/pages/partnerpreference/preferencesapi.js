const API_URL = "https://your-api.com/api/partner-preferences";

/* GET partner preferences */
export const getPreferences = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // remove if not needed
    });

    if (!response.ok) {
      throw new Error("Failed to fetch preferences");
    }

    return await response.json();
  } catch (error) {
    console.error("GET Preferences Error:", error);
    throw error;
  }
};

/* UPDATE single preference */
export const updatePreference = async (payload) => {
  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // optional
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update preference");
    }

    return await response.json();
  } catch (error) {
    console.error("UPDATE Preference Error:", error);
    throw error;
  }
};
