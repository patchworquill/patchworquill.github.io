function setup() {
   let canvas = createCanvas(windowWidth, windowHeight-100);
   canvas.parent('sketch-holder');
   let dark = 0; let light = 255;
}

function draw() {
   background(100);
   //stroke(0);
   let margin = 40;
   let ymargin = 10; // processing top bar height
   let x = width / 2 ; let y = height / 2 - ymargin;
   //rotate(PI/2.0);
   translate(x,y);

   // must draw inward from outside
   // 24 levels including inner circle
   //int level = 1;
   let r = x;
   let barwidth = r / 24;
   // level start on exterior (max radius), at 1 degree = 360 segments, moves inward.
   for(let level = 1; level <= 360; level = level + 1){
      //print("ok");
      if(360 % level == 0){
         let i = true; // used for segment fill color
         // n controls length of arc, as a function of the level increment starts at 1 degree, up to 360 degrees!
         for(let n = -PI/2+mouseX; n <= TWO_PI - PI/2 + mouseX; n = n + level/360*TWO_PI){
            //fill color in alternating black and white segments!
            if(i==true){
               fill(255);
               i = false;
            }
            else{
               fill(0);
               i = true;
            }
            arc(0, 0, r, r, n, n + level/360*TWO_PI);
         }
         if (mouseY < windowHeight and mouseY > 0){
         r = r - barwidth + 23*mouseY/windowWidth;
         }
         else {
           r = r - barwidth;
         }
      }
   }
}

function windowResized(canvas) {
  canvas.resizeCanvas(windowWidth, windowHeight);
}
