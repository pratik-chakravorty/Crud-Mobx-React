import { observable, action, computed } from "mobx";

class BirdStore {
  // anything that we want to keep track of we make it an observable
  @observable birds = [];

  @observable edit = false;

  @observable index = 0;

  // action --> function where you change the value of the property you are observing
  @action addBird = bird => {
    this.birds.push(bird);
  };

  @action removeBird = id => {
    this.birds.splice(id, 1);
  };

  @action updateBird = bird => {
    const i = this.index;
    this.birds[i] = bird;
  };

  @action toggleEdit = () => {
    this.edit = !this.edit;
  };

  @action updateIndex = i => {
    this.index = i;
  };
  //computed --> use it to do some calculations on the observable property. Eg: Shopping Cart where you need the total cost.
  @computed get birdCount() {
    return this.birds.length;
  }
}

const store = new BirdStore();
//we dont want many copies of the store, so whoever imports this will use the one instance of the BirdStore
export default store;
