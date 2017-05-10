var max = 20;

// animate the progressbar
function progressFill(target, to){
  if (target.filled == max) {
    return;
  }

  target.filled = to;

  to = Math.min(max, to);
  to = to * (100 / max);

  Velocity(target.childNodes[3], {
    height: to+'%',
    bottom: 0
  }, {
    duration: 300,
    complete: function() {
      target.childNodes[1].style.color = "#fff";
      target.childNodes[1].style.zIndex = '999';
      if (to == 100) {
        Velocity(target, {
          scale: 1.1
        },
        {
          duration: 200,
          loop: true
        });
      }
    }
  });
}

// 'notes' to store Arrows
var notes = [];

// ==== CLASS FOR ARROWS ==== //

// 1. Direction of arrows
// 2. jQuery img that links to direction bottom
// 3. Destroy when it arrow gets to the
// 4. Explode when arrow gets to the bottom

// Class Arrow
function Arrow(direction) {

  // CSS spacings for the arrows //
  var xPos = null;

  switch(direction) {

    case "left" : xPos = "0px";
    break;

    case "up" : xPos = "120px";
    break;

    case "down" : xPos = "240px";
    break;

    case "right" : xPos = "360px";
    break;

  }

  this.direction = direction;
  this.image = $("<img src='./img/" + direction + ".svg'/>");
  this.image.css({

    position: "absolute",
    top: "0px",
    left: xPos,
    width: "5em",
    height: "5em"

  });

  $('.game-arrow').append(this.image);

}// ends CLASS Arrow

// To enable animating the arrows
Arrow.prototype.step = function() {
  // Controls the speed of the arrows
  this.image.css("top", "+=4px");
};

// Deletes arrows when they get to bottom of page
Arrow.prototype.destroy = function() {
  // removes the image of the DOM
  this.image.remove();
  // Removes the note/arrow from memory/array
  notes.splice(0,1);

  ai();

};

// Explodes arrow when hit
Arrow.prototype.explode = function() {
  this.image.remove();

  ai();
};

function ai() {
  for (var i = 1; i <= 3; i++) {
    var bar = document.querySelectorAll('#outer')[i];
    progressFill(bar, (bar.filled || 0) + (Math.round(Math.random())));
  }
}

// For random arrows
var randNum = 0;

// Frame increasing
var frame = 0;

// Determines the speed of notes
var arrowSpawnRate = 40;

// Random generator for arrows
function randomGen() {
  // Randomizes between 1 and 4
  randNum = Math.floor(Math.random() * 4) + 1;
  if (randNum === 1) {
    notes.push(new Arrow("left"));
  }
  if (randNum === 2) {
    notes.push(new Arrow("right"));
  }
  if (randNum === 3) {
    notes.push(new Arrow("up"));
  }
  if (randNum === 4) {
    notes.push(new Arrow("down"));
  }
}// ends randomGen()

// Render function //
function render() {
  if (frame++ % arrowSpawnRate === 0) {
    randomGen();
  }

  // Animate arrows showering down //
  for (var i = notes.length - 1; i >= 0; i--) {
    notes[i].step();
    // Check for cleanup
    if (notes[i].image.position().top > 615) {
      notes[i].destroy();
    }
  }

}// ends render()

// jQuery to animate arrows //
$('.message').click(function () {
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {

      window.setTimeout(callback, 40 / 75);

    };
  })();

  /*  place the rAF *before* the render()
    to assure as close to 60fps with the
    setTimeout fallback.          */

  // Infinte loop for game play
  (function animloop() {
    requestAnimFrame(animloop);
    render();
  })();// ends (function animloop() )
});// ends $(doc).ready


// Listening for when the key is pressed
$(document).keydown( function(event) {
  for (var i = 0; i < notes.length; i++) {
    var hit = false;

    if (event.keyCode == 37 && notes[i].direction == "left") {
      if (notes[i].image.position().top > 490 && notes[i].image.position().top < 530) {
        hit = true;
      }
    }
    if (event.keyCode == 38 && notes[i].direction == "up") {
      if (notes[i].image.position().top > 490 && notes[i].image.position().top < 530) {
        hit = true;
      }
    }
    if (event.keyCode == 40 && notes[i].direction == "down") {
      if (notes[i].image.position().top > 490 && notes[i].image.position().top < 530) {
        hit = true;
      }
    }
    if (event.keyCode == 39 && notes[i].direction == "right") {
      if (notes[i].image.position().top > 490 && notes[i].image.position().top < 530) {
        hit = true;
      }
    }

    if (hit) {
      var bar = document.querySelectorAll('#outer')[0];
      notes[i].explode();

      progressFill(bar, (bar.filled || 0) + 1);
    }

  }// ends loop

});// ends $(doc).keyup
