function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB); // This is the "missing link" for your clr2 math!
  background(220); // Draw the background once at the start
}

function draw() {
  // Your code from the image goes here...
  var clr2 = color(30 + mouseX % 60, 50, 100);
  clr2.setAlpha(100);
  
  fill(clr2);
  noStroke();
  ellipse(mouseX, mouseY, 100, 100);
}
