export default class Cell {
  constructor(x, y) {
    this.xCoord = x;
    this.yCoord = y;
    this.shipPart = false;
    this.shipType = null;
    this.hit = false;
  }

  get x() {
    return this.xCoord;
  }

  get y() {
    return this.yCoord;
  }

  get isShip() {
    return this.shipPart;
  }

  get isHit() {
    return this.hit;
  }

  set isShip(bool) {
    this.shipPart = bool;
  }

  get ship() {
    return this.shipType;
  }

  set ship(obj) {
    this.shipType = obj;
  }
}
