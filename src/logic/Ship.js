// use git branching
export default class Ship {
  constructor(length) {
    this.shipLength = length;
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
    return this.length === this.numOfTimesHit ? true : false;
  }
}
