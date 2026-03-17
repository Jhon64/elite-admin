export const localStorageHelper = {
  createItem: (name: string, data: any) => {
    if (typeof data == 'string') {
      localStorage.setItem(name, data);
    } else if (typeof data == 'number') {
      localStorage.setItem(name, String(data));
    } else if (typeof data == 'object') {
      localStorage.setItem(name, JSON.stringify(data));
    }
  },
  deleteItems: (names: string[]) => {
    if (names.length > 0) {
      for (let name of names) {
        localStorage.removeItem(name);
      }
    }
  },
  deleteItemsByIgnoring: (names: string[]) => {
    if (names.length > 0) {
      for (let name in localStorage) {
        if (!names.includes(name)) {
          localStorage.removeItem(name);
        }
      }
    }
  },
  deleteItem: (name: string) => {
    localStorage.removeItem(name);
  },
  getToken: () => {
    return localStorage.getItem('_token');
  },
  getItemObject: (name: string) => {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item);
    } else return null;
  },
  getItemString: (name: string) => {
    return localStorage.getItem(name);
  },
  clearAll: () => {
    localStorage.clear();
  },

  getItemNumber: (name: string) => {
    const item = localStorage.getItem(name);
    if (item) {
      return Number(item);
    } else return null;
  },
};
