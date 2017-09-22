var five = require("johnny-five");
var board = new five.Board({ repl: false });

board.on("ready", function () {
    var led = new five.Led(13);
    led.blink(50);

    var servo = new five.Servo(10);

    // Sweep from 0-180 and repeat.
    servo.sweep();

    var proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7

    });
    
    var distance = 0;
    var counter = 1;
    proximity.on("data", function () {
        distance += this.cm;
        counter++;
        // console.log("Proximity: ");
        // console.log("  cm  : ", this.cm);
        // console.log("  in  : ", this.in);
        // console.log("-----------------");
    });

    setInterval(function() {
        var d = distance/counter
        console.log(d.toFixed(2))
        distance = 0;
        counter = 1;
     }, 100)

    // proximity.on("change", function () {
    //     console.log("The obstruction has moved.");
    // });
});