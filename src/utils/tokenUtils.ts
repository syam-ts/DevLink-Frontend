export const getAccessToken = () => localStorage.getItem("accessTokenU");
export const setAccessToken = (token: string) => localStorage.setItem("accessTokenU", token);
export const clearTokens = () => localStorage.removeItem("accessTokenU");
