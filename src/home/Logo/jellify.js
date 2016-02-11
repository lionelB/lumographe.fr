
export function jellify(points, jellySettings,  mouseX, mouseY) {
  return pointsToString(points);
}

export const pointsToString  = ([start, ...points]) => {
  return `${start[0]}${start[1]},${start[2]} ` + points.map(([letter, x, y, cx1, cy1, cx2, cy2]) => {
      return `${letter}${x},${y} ${cx1},${cy1} ${cx2},${cy2}`;
  }).join(" ");
};

export const jellySettings = {
  radius: 50,
  elasticity: 13,
  viscosity: .5,
  damping: .42 
}

class Point{
  constructor( x, y) {
    this.x = x;
    this.y = y;
  }
  add(p) {
    return new Point(this.x + p.x, this.y + p.y);
  }
  subtract(p) {
    return new Point(this.x - p.x, this.y - p.y);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize(length = 0){
    const factor = lenght / this.lenght();
    return new Point(this.x * factor, this.y * factor);
  }
}

export class JellyPoint {
  constructor([command, ...coord], settings) {
    this.command = command
    if (command === "M") {
      let [x, y] = coord;
      this.x = x;
      this.y = y;
      this.coord = {x, y};
    } else {
      let [x1, y1, x2, y2, x, y] = coord;
      this.x = x;
      this.y = y;
      this.coord = {x, y, x1, y1, x2, y2};
    }
    this.settings = {...settings}
    this.offsetX = 0;
    this.offsetY = 0;
  }
  update(mouseX, mouseY) {
    if (mouseX === undefined || mouseY === undefined) {
      return 
    }
    this.offsetX += (this.coord.x - this.x) / this.settings.elasticity;
    this.offsetY += (this.coord.y - this.y) / this.settings.elasticity;

    const delta = new Point(this.x, this.y).subtract({x: mouseX, y: mouseY});

    if (delta.length() <= this.settings.radius) {
      const a = Math.atan2(delta.y, delta.x);
      this.offsetX += (Math.cos(a) * this.settings.radius - delta.x) * (1- this.settings.damping);
      this.offsetY += (Math.sin(a) * this.settings.radius - delta.y) * (1- this.settings.damping);
    }

    this.offsetX *= (1 - this.settings.viscosity);
    this.offsetY *= (1 - this.settings.viscosity);
    if (Math.abs( this.offsetX) < .001) {
      this.offsetX = 0;
    }
    if (Math.abs( this.offsetY) < .001) {
      this.offsetY = 0;
    }
    
    this.x += this.offsetX; 
    this.y += this.offsetY; 
  }

  toSVG(){
    if (this.command === "M") {
      return `M${this.x},${this.y}`;
    } else {
      return `${this.command}${this.x},${this.y} ${this.x},${this.y} ${this.x},${this.y}`; 
    }
 }
}

