class Tapestry {
  constructor(){
    this.lineCount = 36;
    this.oscCount = 5;

    this.innerRad = 150;
    this.outerRad = 700;

    textSize(pgTextSize);

    this.lineSpace = 0.8;

    this.lineDistCore;
    this.lineRad = [];
    this.lineAng =[];
    this.lineAngStart = [];
    this.lineAngMax = [];

    this.lineFullAng = [];

    this.nDelay = -1;
    this.mDelay = -2;
    this.animWindow = 90;
    this.pauseWindow = 70;
    this.ticker = [];
    this.scrubDelay = [];

    this.centerYtarget = 0;
    this.centerY = [];

    this.ranRotTarget = [];
    this.ranRot = [];

    this.justifyMode = 3;
    this.letterSpacer = 1.0;

    this.setText();
  }

  setText(){
    textSize(pgTextSize);

    this.lineDistCore = textWidth("O") * this.letterSpacer;
    this.inputTextLine = [];

    for(var m = 0; m < this.lineCount; m++){
      this.inputTextLine[m] = inputText;
      this.ranRotTarget[m] = random(-PI,PI);
      // this.ranRotTarget[m] = 0;
      // this.ranRotTarget[m] = map(noise(m * 0.1), 0, 1, 0, TWO_PI);

      if(floor(m/this.oscCount)%2 < 1){
        for(var p = 0; p < m%this.oscCount; p++){
          this.inputTextLine[m] += " " + inputText;
        }        
      } else {
        for(var p = this.oscCount - 1; p > (m%this.oscCount) - 1; p--){
          this.inputTextLine[m] += " " + inputText;
        }  
      }
      // if(floor(m/this.oscCount)%2 < 1){
      //   for(var p = this.oscCount - 1; p > (m%this.oscCount) - 1; p--){
      //     this.inputTextLine[m] += " " + inputText;
      //   }          
      // } else {
      //   for(var p = 0; p < m%this.oscCount; p++){
      //     this.inputTextLine[m] += " " + inputText;
      //   }
      // }
    }

    for(var m = 0; m < this.lineCount; m++){
      // this.lineRad[m] = map(m, 0, this.lineCount-1, this.innerRad, this.outerRad);
      this.lineRad[m] = this.innerRad + m * pgTextSize * this.lineSpace;

      // var circ = TWO_PI * this.lineRad[m];

      this.lineAngStart[m] = this.lineDistCore/this.lineRad[m];
      this.lineAngMax[m] = TWO_PI/this.inputTextLine[m].length;

      this.ticker[m] = [];
      this.scrubDelay[m] = [];
      this.lineAng[m] = [];
      this.centerY[m] = []
      for(var n = 0; n < this.inputTextLine[m].length; n++){
        var mDist, nDist;
        if(delayCenter == 0){
          mDist = dist(m, 0, 0, 0);
          nDist = dist(n, 0, 0, 0);
        } else if(delayCenter == 1){
          mDist = dist(m, 0, 0, 0);
          nDist = dist(n, 0, this.inputTextLine[m].length/2, 0);
        } else if(delayCenter == 2){
          mDist = dist(m, 0, 0, 0);
          nDist = dist(n, 0, this.inputTextLine[m].length, 0);
        } else if(delayCenter == 3){
          mDist = dist(m, 0, this.lineCount/2, 0);
          nDist = dist(n, 0, 0, 0);
        } else if(delayCenter == 4){
          mDist = dist(m, 0, this.lineCount/2, 0);
          nDist = dist(n, 0, this.inputTextLine[m].length/2, 0);
        } else if(delayCenter == 5){
          mDist = dist(m, 0, this.lineCount/2, 0);
          nDist = dist(n, 0, this.inputTextLine[m].length, 0);
        } else if(delayCenter == 6){
          mDist = dist(m, 0, this.lineCount, 0);
          nDist = dist(n, 0, 0, 0);
        } else if(delayCenter == 7){
          mDist = dist(m, 0, this.lineCount, 0);
          nDist = dist(n, 0, this.inputTextLine[m].length/2, 0);
        } else if(delayCenter == 8){
          mDist = dist(m, 0, this.lineCount, 0);
          nDist = dist(n, 0, this.inputTextLine[m].length, 0);
        }

        var mDelay = mDist * this.mDelay;
        var nDelay = nDist * this.nDelay;

        this.ticker[m][n] = mDelay + nDelay;
        this.scrubDelay[m][n] = this.ticker[m][n];
        this.lineAng[m][n] = 0;
        this.centerY[m][n] = 0;
      }
    }
    
    // this.centerYtarget = this.outerRad/2;
    this.centerYtarget = 0;

    loopLength = (this.animWindow + this.pauseWindow) + (this.oscCount * inputText.length * abs(this.nDelay)) + this.lineCount * abs(this.mDelay);
    print(loopLength);
  }

  run(){
    this.updateMotion();
    this.display();
  }

  // updateStatic(){
  //   for(var m = 0; m < this.lineCount; m++){
  //     this.lineFullAng[m] = 0;
  //     for(var n = 0; n < this.inputTextLine[m].length; n++){
  //       this.lineAng[m][n] = this.lineAngMax[m];
  //       this.centerY[m][n] = 0;

  //       if(n < this.inputTextLine[m].length - 1){
  //         this.lineFullAng[m] += this.lineAng[m][n];
  //       }
  //     }
  //     this.ranRot[m] = 0;
  //   }
  // }

  updateMotion(){
    for(var m = 0; m < this.lineCount; m++){
      this.lineFullAng[m] = 0;
      for(var n = 0; n < this.inputTextLine[m].length; n++){
        var thisTicker;

        if(animateOn){
          thisTicker = this.ticker[m][n];
          this.ticker[m][n] ++;
        } else {
          thisTicker = scrubTicker - this.scrubDelay[m][n];
          // this.ticker[m][n]
        }

        if(thisTicker < 0){
          this.lineAng[m][n] = this.lineAngStart[m];
          this.centerY[m][n] = this.centerYtarget;

        } else if(thisTicker < this.animWindow){
          var tk0 = map(thisTicker, 0, this.animWindow, 0, 1);
          this.lineAng[m][n] = map(coreEngine(tk0), 0, 1, this.lineAngStart[m], this.lineAngMax[m]);
          this.centerY[m][n] = map(coreEngine(tk0), 0, 1, this.centerYtarget, 0);
       
        } else if(thisTicker < this.animWindow + this.pauseWindow){
          this.lineAng[m][n] = this.lineAngMax[m];
          this.centerY[m][n] = 0;
        } else if(thisTicker < this.animWindow * 2 + this.pauseWindow){
          var tk0 = map(thisTicker, this.animWindow + this.pauseWindow, this.animWindow * 2 + this.pauseWindow, 0, 1);
          this.lineAng[m][n] = map(coreEngine(tk0), 0, 1, this.lineAngMax[m], this.lineAngStart[m]);
          this.centerY[m][n] = map(coreEngine(tk0), 0, 1, 0, this.centerYtarget);   
          
        } else {
          this.lineAng[m][n] = this.lineAngStart[m];
          this.centerY[m][n] = this.centerYtarget;
        }
  
        // this.lineFullAng[m] = (this.inputTextLine[m].length - 1) * this.lineAng[m];
        if(n < this.inputTextLine[m].length - 1){
          this.lineFullAng[m] += this.lineAng[m][n];
        }

        if(this.ticker[m][n] > this.animWindow * 2 + this.pauseWindow * 2){
          this.ticker[m][n] = 0;
        }
      }

      var randomRotTicker;
      if(animateOn){
        randomRotTicker = this.ticker[m][0];
      } else {
        randomRotTicker = scrubTicker - this.scrubDelay[m][0];
      }
      if(randomRotTicker < 0){
        this.ranRot[m] = this.ranRotTarget[m];

      } else if(randomRotTicker < this.animWindow){
        var tk0 = map(randomRotTicker, 0, this.animWindow, 0, 1);
        this.ranRot[m] = map(easeInOutExpo(tk0), 0, 1, this.ranRotTarget[m], 0);
     
      } else if(randomRotTicker < this.animWindow + this.pauseWindow){
        this.ranRot[m] = 0;
      
      } else if(randomRotTicker < this.animWindow * 2 + this.pauseWindow){
        var tk0 = map(randomRotTicker, this.animWindow + this.pauseWindow, this.animWindow * 2 + this.pauseWindow, 0, 1);
        this.ranRot[m] = map(easeInOutExpo(tk0), 0, 1, 0, this.ranRotTarget[m]);
        
      } else {
        this.ranRot[m] = this.ranRotTarget[m];
      }
    }
  }

  display(){
    textFont(tFont[0]);
    textSize(pgTextSize);
    noStroke();
    fill(foreColor);
    textAlign(CENTER);

    push();
      for(var m = 0; m < this.lineCount; m++){
        var culmAng = 0;
        for(var n = 0; n < this.inputTextLine[m].length; n++){
          var thisAng = -PI/2;
          if(this.justifyMode == 0){
            thisAng = -this.lineFullAng[m]/2 - PI/2 + culmAng;
          } else if(this.justifyMode == 1){
            thisAng = -PI/2 + culmAng;
          } else if(this.justifyMode == 2){
            thisAng = -this.lineFullAng[m] - PI/2 + culmAng;
          } else {
            thisAng = culmAng;
          }

          var x = cos(thisAng) * this.lineRad[m];
          var y = sin(thisAng) * this.lineRad[m];

          push();
            if(this.justifyMode == 3){
              rotate(this.ranRot[m]);
            }
            translate(x, y);
            
            translate(0, this.centerY[m][n]);
            // ellipse(0, 0, 5, 5);

            rotate(thisAng + PI/2);
            translate(0, pgTextSize * 0.7/2);

            text(this.inputTextLine[m].charAt(n), 0, 0);
          pop();

          culmAng += this.lineAng[m][n];
        }
      }
    pop();
  }

  refreshWidth(){

  }
}
