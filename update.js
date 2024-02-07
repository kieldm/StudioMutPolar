function setText(){
  var enteredText = document.getElementById("text0").value;
  inputText = enteredText;

  // inputText = enteredText.match(/[^\r\n]+/g);
  // if(enteredText == ""){
  //   print("SHORT EXECUTED! and inputText is " + inputText);
  //   inputText = [];
  //   inputText[0] = " ";
  // }

  if(coreTap != null){
    coreTap.setText();
  }
}

function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function setPGtextSize(val){
  pgTextSize = map(val, 0, 100, 1, 44);
  coreTap.setText();
}

function setInnerRad(val){
  var innerRadFactor = map(val, 0, 100, 0.01, 1);
  coreTap.innerRad = coreTap.outerRad * innerRadFactor;
  coreTap.setText();
}

function setLineSpace(val){
  coreTap.lineSpace = map(val, 0, 100, 0.8, 4);
  coreTap.setText();
}

function setLineCount(val){
  coreTap.lineCount = round(map(val, 0, 100, 2, 74));
  coreTap.setText();
}

function setLetterSpacer(val){
  coreTap.letterSpacer = map(val, 0, 100, 0.7, 2.0);
  coreTap.setText();
}

function setOscCount(val){
  var oscFactor = map(val, 0, 100, 0.01, 1);
  coreTap.oscCount = round(coreTap.lineCount * oscFactor);
  coreTap.setText();
}

function setJustify(val){
  coreTap.justifyMode = val;
}

function setSpeed(val){
  coreTap.animWindow = round(map(val, 0, 100, 300, 10));
  coreTap.setText();
}

function setPause(val){
  coreTap.pauseWindow = round(map(val, 0, 100, 0, 200));
  coreTap.setText();
}

function setMotionType(val){
  motionType = val;
}

function setAccelType(val){
  accelType = val;
}

function toggleAnimateOn(){
  animateOn = !animateOn;
}

function toggleSpinOn(){
  spinOn = !spinOn
}

function setLineDelay(val){
  coreTap.mDelay = round(map(val, 0, 100, -10, 10));
  coreTap.setText();
}

function setCharDelay(val){
  coreTap.nDelay = round(map(val, 0, 100, -10, 10));
  coreTap.setText();
}

function setDelayCenter(val){
  delayCenter = val;
  coreTap.setText();
}