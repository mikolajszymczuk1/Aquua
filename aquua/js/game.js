import Fish from "./gameClasses/fish";
import Food from "./gameClasses/food";
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
game.addEventListener("contextmenu", (e) => { e.preventDefault() });
game.width = gameConfig.windowSize.width;
game.height = gameConfig.windowSize.height;
game.style.backgroundColor = "#0d47a1";

// Fishes objects
let fishes = [];

// Foods
let foods = [];

// Events
game.addEventListener("mousedown", (e) => {
    let rect = game.getBoundingClientRect();
    let mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    
    // When click fish, fish get confused
    if (e.button === 0) {
        fishes.forEach((fish) => {
            if (mousePos.x <= fish.posX + (fish.width / 2) && mousePos.x >= fish.posX - (fish.width / 2) &&
                mousePos.y <= fish.posY + (fish.height / 2) && mousePos.y >= fish.posY - (fish.width / 2)) {
                fish.setNewFollowPoint(mousePos.x, mousePos.y);
                fish.confusion(2000);
            }
        });
    }

    // When click on free space/area, create food
    if (e.button === 2) {
        foods.push(new Food(ctx, mousePos.x, mousePos.y, 5));
    }
});

game.addEventListener("mousemove", (e) => {
    let rect = game.getBoundingClientRect();
    let mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // When move cursor on fish, show fish hunger status bar
    fishes.forEach((fish) => {
        if (mousePos.x <= fish.posX + (fish.width / 2) && mousePos.x >= fish.posX - (fish.width / 2) &&
            mousePos.y <= fish.posY + (fish.height / 2) && mousePos.y >= fish.posY - (fish.height / 2)) {
            fish.showInfo = true;
            setTimeout(() => { fish.showInfo = false; }, 500);
        }
    });
}); 

// Init function to create objects when game start
function init() {
    // Create fishes
    for (let i = 0; i < 20; i++) {
        fishes.push(new Fish(
            ctx,
            randomNumber(10, ctx.canvas.width - 10),
            randomNumber(10, ctx.canvas.height - 10),
            20, 20,
            "white"
        ));
    }
}

// Main loop
function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, game.width, game.height)

    // Update fishes
    fishes.forEach((fish) => {
        fish.draw();
        fish.update();
        fish.catchFood(foods);
    });
    
    // Update foods
    foods.forEach((food) => {
        food.draw();
        food.update();
        
        if (food.isOutOfAquarium() || food.isEaten) {
            let newFoods = foods.filter((el) => el !== food);
            foods = newFoods;
        }
    });
}

init();
animate();
