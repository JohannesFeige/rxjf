// General-purpose functions
const trush = (x) => (f) => f(x);
const tap = (f) => (x) => {
  f(x);
  return x;
};
const pipe = (...fs) => (x) => fs.reduce((acc, f) => f(acc), x);
const mult = (x) => (y) => x * y;

const Rx = {};
Rx.map = (f) => new Mapper(f);

const double = mult(2);

// Reactive library
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

  pipe(o) {
    this.subscribe((x) => o.emit(x));
    return o;
  }
}

class Mapper {
  constructor(f) {
    this.observable = new Observable();
    this.f = f;
  }
  subscribe(cbs) {
    this.observable.subscribe(cbs);
  }
  emit(x) {
    this.observable.emit(this.f(x));
  }
}

// Example
const original = new Observable();

const doubled = original.pipe(Rx.map(mult(2)));
// const doubler = original.pipe(new Mapper((x) => x * 2));

// const doubleAbs = original.pipe(
//   new Mapper((x) => x * 2),
//   new Mapper(Math.abs)
// );

original.subscribe(console.log);
// doubler.subscribe(console.log);
// doubleThenAddTen.subscribe(console.log);

original.emit(10);
original.emit(-1);
original.emit(1);
