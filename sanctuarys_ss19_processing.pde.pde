void setup() {
   size(screen.width, screen.height-100);
}

void draw() {
   background(100);
   noStroke();
   let margin = 40;
   let ymargin = 10;
   
   let x = width / 2;
   let y = height / 2 - ymargin;

   translate(x,y); // go to centre
   
   // 24 levels currently
   let numbars = 30;
   let r = screen.width;
   let barwidth = r / numbars;

   for(let level = 1; level <= 360; level = level + 1){
      if(360 % level == 0){
         let i = true;
         for(let n = -PI/2+ mouseX ; n <= TWO_PI - PI / 2 + mouseX ; n = n + level / 360 * TWO_PI){
            if(i){fill(255);i=false;}
            else{fill(0);i=true;}
            arc(0, 0, r, r, n, n + level / 360*TWO_PI);
        }

      }
   r = r-barwidth + numbars * mouseY / height;
   }
}