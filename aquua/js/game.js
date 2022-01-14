import Fish from "./gameClasses/fish";
import { randomNumber } from "./utilities/helpers";

const game = document.getElementById("game");
const ctx = game.getContext("2d");

// Config
const gameConfig = {
    windowSize: {
        width: 800,
        height: 500
    }
}

// Window setup
game.width = gameConfig.windowSize.width;
game.height = gameConfig.windowSize.height;

// Fishes objects
let fishes = [];

// Init function to create objects when game start
function init() {
    // Create fishes
    for (let i = 0; i < 10; i++) {
        fishes.push(new Fish(
            ctx,
            randomNumber(0, ctx.canvas.width - 15),
            randomNumber(0, ctx.canvas.height - 15),
            15
        ));
    }
}

// Main loop
function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, game.width, game.height)
    fishes.forEach((fish) => { fish.draw(); fish.update() });
}

init();
animate();
