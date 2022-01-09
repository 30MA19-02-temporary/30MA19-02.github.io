let kappa = +1;
class Point extends noneuc.Point {
  constructor(lat, lon, dir, kappa) {
    super(
      lon * TWO_PI,
      - lat * TWO_PI,
      - dir * TWO_PI,
      kappa
    )
  }
}

class MyPoint {
  constructor(lat, lon, dir, kappa) {
    this.slider = [lat, lon, dir, kappa];
    this.point = new Point(
      this.slider[0].value(),
      this.slider[1].value(),
      this.slider[2].value(),
      this.slider[3].value(),
    );
  }
  update() {
    this.slider.forEach((slider) => slider.update());
    if (this.slider.some((slider) => slider.changed)) {
      this.point = new Point(
        this.slider[0].value(),
        this.slider[1].value(),
        this.slider[2].value(),
        this.slider[3].value(),
      );
    }
  }
  operate(other) {
    // other: Point
    return this.point.operate(other);
  }
}
