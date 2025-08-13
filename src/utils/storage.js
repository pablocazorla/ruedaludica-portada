const STORAGE_KEY = "RUEDA_LUDICA_STORAGE";

const storage = {
  getItem: () => {
    return localStorage.getItem(STORAGE_KEY) || null;
  },
  setItem: (value) => {
    localStorage.setItem(STORAGE_KEY, value);
  },
};

export default storage;
