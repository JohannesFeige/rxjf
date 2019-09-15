const trush = (x) => (f) => f(x);

class Observable {
  constructor() {
    this.cbs = [];
  }

  subscribe(cbs) {
    this.cbs.push(cbs);
  }

  emit(x) {
    this.cbs.map(trush(x));
  }
}

const observable = new Observable();

observable.subscribe((x) => console.log(x));

observable.emit(10);
observable.emit(1);
observable.emit(2);
observable.emit(3);
observable.emit(4);
