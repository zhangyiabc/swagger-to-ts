import _ from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

export class CommonStore {
  animating = false;
  loadingTimer: any = null;
  loading = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  startLoading = (): void => {
    this.loading += 1;
    if (this.loadingTimer === null) {
      runInAction(() => {
        this.loadingTimer = setTimeout(() => {
          this.animating = true;
        }, 200);
      });
    }
  };

  endLoading = (): void => {
    if (this.loading > 0) {
      this.loading -= 1;
    } else {
      this.loading = 0;
    }
    if (this.loading === 0) {
      this.animating = false;
      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
    }
  };
}

export default new CommonStore();
