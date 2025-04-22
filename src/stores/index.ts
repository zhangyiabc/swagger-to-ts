import { useContext, createContext } from 'react';
import commonStore from './common';
import userStore from './user';

class RootStore {
  commonStore = commonStore;
  userStore = userStore;
}

const rootStoreContext = createContext<RootStore>(new RootStore());

export const useStore = () => {
  return useContext(rootStoreContext);
};
