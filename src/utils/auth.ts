// src/utils/auth.ts
export const setUserId = (userId: string) => {
    localStorage.setItem("user_id", userId);
};

export const getUserId = (): string | null => {
    return localStorage.getItem("user_id");
};

export const clearUserId = () => {
    localStorage.removeItem("user_id");
};

export const isAuthenticated = (): boolean => {
    return !!getUserId();
};
