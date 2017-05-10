var leftArrow = document.querySelectorAll(".arrow-left");
var upArrow = document.querySelectorAll(".arrow_left");
var downArrow = document.querySelectorAll(".arrow_left");
var rightArrow = document.querySelectorAll(".arrow_left");

document.querySelectorAll('#outer').forEach(function(e) {
  e.addEventListener('click' , progressFill);
});

function progressFill(e){
  Velocity(e.target.childNodes[3], {
    height: '100%'
  }, 1500);
}

// we gaan ervan uit dat:
// 15 Watts per stap
// elke stap gaat de progressbar omhoog met 15
// degene die het eerste bij een bepaald score komt wint de game.
