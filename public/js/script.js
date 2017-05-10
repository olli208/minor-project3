var leftArrow = document.querySelectorAll(".arrow-left");
var upArrow = document.querySelectorAll(".arrow_left");
var downArrow = document.querySelectorAll(".arrow_left");
var rightArrow = document.querySelectorAll(".arrow_left");

/* Animate all divs at once. */
Velocity(
  leftArrow, {
    translateY: '80vh'
  }, 3000);


document.querySelectorAll('#outer').forEach(function(e) {
  e.addEventListener('click' , myfunction);
});

function myfunction(e){
  Velocity(e.target.childNodes[3], {
    height: '100%'
  }, 1500);
}

