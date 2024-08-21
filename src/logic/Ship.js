export default class Ship {
  constructor(length, name) {
    this.shipLength = length;
    this.name = name;
    this.numOfTimesHit = 0;
    this.sunk = false;
  }

  get numOfHits() {
    return this.numOfTimesHit;
  }

  get length() {
    return this.shipLength;
  }

  hit() {
    this.numOfTimesHit += 1;
  }

  isSunk() {
    this.sunk = this.length === this.numOfTimesHit;
    return this.sunk;
  }
}
