// Declaration
class Ob_ {
  constructor(url) {
    this.url = url;
  }
};

// Method
calcArea() {
  return this.height * this.width;
}

const bgw = new Ob_(10);
console.log(bgw);

class Rectangle_D {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};


// Expression: the class is anonymous but assigned to a variable
const Rectangle_E = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// Expression: the class has its own name
const Rect = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
