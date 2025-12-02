const STORAGE_KEY = "RUEDA_LUDICA_STORAGE_2";

const storage = {
  getItem: (name: string) => {
    return localStorage.getItem(STORAGE_KEY + "_" + name) || null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(STORAGE_KEY + "_" + name, value);
  },
};

export default storage;
