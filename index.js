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

const tap = (f) => (x) => {
  f(x);
  return x;
};
const pipe = (...fs) => (x) => fs.reduce((acc, f) => f(acc), x);

const double = (x) => x * 2;
observable.subscribe(
  pipe(
    double,
    tap(console.log),
    tap(console.log)
  )
);

observable.emit(10);
observable.emit(1);
observable.emit(2);
observable.emit(3);
observable.emit(4);
