export const API_BASE_URL = "http://localhost:3000";

export const getAccessToken = () => localStorage.getItem("accessTokenU");

export const getRefreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/refresh-token`, {
      credentials: "include", 
    });
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem("accessTokenU", data.accessToken); 
      return data.accessToken;
    } else {
      throw new Error(data.message || "Failed to refresh token");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

export const clearTokens = () => {
  localStorage.removeItem("accessTokenU");
};
