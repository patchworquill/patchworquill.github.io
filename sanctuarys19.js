function setup() {
   let canvas = createCanvas(screen.height, screen.width);
   canvas.parent('sketch-holder');
   let dark = 0; let light = 255;
}

function draw() {
   background(light);
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
   
   // level start on exterior (max radius), at 1 degree = 360 segments, moves inward.
   for(let level = 1; level <= 360; level = level + 1){  
      //print("ok");
      if(360 % level == 0){
         let i = true; // used for segment fill color
         // n controls length of arc, as a function of the level increment starts at 1 degree, up to 360 degrees!
         for(let n = -PI/2+mouseX; n <= TWO_PI - PI/2 + mouseX; n = n + level/360*TWO_PI){
            //fill color in alternating black and white segments!
            if(i==true){
               fill(light);
               i = false;
            }
            else{
               fill(dark);
               i = true;
            }
            arc(0, 0, r, r, n, n + level/360*TWO_PI);
         }
         r = r - 21;
      } 
   }   
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}