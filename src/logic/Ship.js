export default class Ship {
  constructor(length) {
    this.length = length;
    this.numOfTimesHit = 0;
    this.sunk = false;
  }

  get numOfHits() {
    return this.numOfTimesHit;
  }

  hit() {
    this.numOfTimesHit += 1;
  }

  isSunk() {
    return this.length === this.numOfTimesHit ? true : false;
  }
}
