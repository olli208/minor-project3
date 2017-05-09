function myMove() {
    var elem = document.querySelector(".arrow");
    var pos = 0;
    var id = setInterval(frame, 3);
    function frame() {
        if (pos == 600) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

myMove();

// andere code niks met deze te maken
var start = Date.now();

var timer = setInterval(function() {
    var timePassed = Date.now() - start;

    // train.style.left = timePassed / 5 + 'px';

    if (timePassed > 2000) clearInterval(timer);

}, 20);