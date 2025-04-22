import { makeAutoObservable, observable, action, runInAction } from 'mobx';
import { getUserInfo, login } from 'src/services/login';
import common from './common';

class userStore {
  name: string = '';
  userId: string = '';
  phone: string = '110';
  token: string = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(username: string, password: string) {
    await login(username, password).then(res => {
      runInAction(() => {
        const { data } = res;
        this.token = data.token;
        localStorage.setItem('token', this.token);
      });
    });
  }

  async getUserInfo() {
    common.startLoading();
    await getUserInfo().then(({ data = {} }) => {
      runInAction(() => {
        this.phone = data?.phone || '110';
        this.name = data?.name;
        this.userId = data?.userId;
      });
    });
    common.endLoading();
  }

  logout() {
    // 清除token
    localStorage.removeItem('token');
    this.token = '';
    window.location.href = '/login';
  }
}

export default new userStore();
