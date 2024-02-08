var bkgdColor, foreColor;
var tFont = [];
var pgTextSize = 22;
var inputText;
var starterText = "INEQUALITIES";
// var starterText = "LONG\nDAYS\nAND\nSHORTER\nNIGHTS";

var coreTap;

var widthWindow;

var widgetOn = true;

var motionType = 0;
var accelType = 3;

var animateOn = true;
var spinOn = true;

var delayCenter = 0;
var scrubTicker = 0;
var loopLength = 0;

var exportSVGon = false;

function preload(){
  // tFont[0] = loadFont("resources/NeueMontreal-Bold.ttf");
  // tFont[0] = loadFont("resources/NeueMontreal-Regular.ttf");
  tFont[0] = loadFont("resources/RiformaLL-Bold.otf");
  // tFont[0] = loadFont("resources/EditorialNew-Regular.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  frameRate(30);
  noSmooth();
  textureMode(NORMAL);
  rectMode(CENTER);

  document.getElementById("text0").value = starterText;
  setText(starterText);

  coreTap = new Tapestry();
}

function draw(){
  clear();
  background(bkgdColor);

  push();
    translate(width/2, height/2);
    if(spinOn){
      rotate(frameCount * -0.001);
    }
    // fill(0,0,255);
    // ellipse(0,0,5,5);

    coreTap.run();
  pop();

  if(exportSVGon){
    save("STGpolar_SM.svg");
    exportSVGon = false;

    window.location.reload();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight,WEBGL);

  for(var m = 0; m < inputText.length; m++){
    // coreLunar[m].refreshWidth();
  }
}
