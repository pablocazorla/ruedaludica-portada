const STORAGE_KEY = "RUEDA_LUDICA_STORAGE";

const storage = {
  getItem: (name) => {
    return localStorage.getItem(STORAGE_KEY + "_" + name) || null;
  },
  setItem: (name, value) => {
    localStorage.setItem(STORAGE_KEY + "_" + name, value);
  },
};

export default storage;
