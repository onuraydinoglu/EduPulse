const AUTH_USER_KEY = "edupulse_user";

export const authStorage = {
  setUser: (user) => {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem(AUTH_USER_KEY);

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  removeUser: () => {
    localStorage.removeItem(AUTH_USER_KEY);
  },
};
