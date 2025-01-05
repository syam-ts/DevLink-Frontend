import { getAccessToken, getRefreshToken, API_BASE_URL } from "./auth";

export const fetchData = async (endpoint: any, options: any = {}) => {
  try {
    let accessToken = getAccessToken();

    if (!accessToken) {
      console.warn("Access token missing. Attempting refresh...");
      accessToken = await getRefreshToken();
      if (!accessToken) {
        window.location.href = "/user/login"; // Redirect to login if refresh fails
        return;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      console.warn("Access denied. Redirecting to login...");
      window.location.href = "/user/login";
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
  }
};
