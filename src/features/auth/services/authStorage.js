const AUTH_USER_KEY = "okulpro_user";

export const authStorage = {
  setUser: (user) => {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem(AUTH_USER_KEY);
  },
};
