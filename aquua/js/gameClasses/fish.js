import { randomNumber } from "../utilities/helpers";

class Fish {
    constructor(context, posX, posY, radius, color) {
        this.c = context;
        this.posX = posX;
        this.posY = posY;
        this.r = radius;
        this.color = color;
        this.escape = false;
        this.hasFoodTarget = false;
        this.showInfo = false;

        // Hunger status
        this.hungerState = 0;
        this.maxHungerState = 30;

        // Create first point after fish is created
        this.followPoint = this.createFollowPoint();
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.posX, this.posY, this.r, 0, 2 * Math.PI);
        this.c.fillStyle = this.color;
        this.c.fill();

        // Draw hunger bar
        if (this.showInfo) {
            let barWidth = 30;
    
            this.c.beginPath();
            this.c.strokeStyle = "white";
            this.c.rect(this.posX - (barWidth / 2), this.posY - 25, barWidth, 5);
            this.c.stroke();
    
            this.c.beginPath();
            let barValue = parseInt((this.hungerState / this.maxHungerState) * 100);
            this.c.fillStyle = "white";
            this.c.fillRect(this.posX - 15, this.posY - 25, (barValue * barWidth) / 100, 5);
            this.c.stroke();
        }
    }

    update() {
        let dx = (this.followPoint.x - this.posX) * .125;
        let dy = (this.followPoint.y - this.posY) * .125;
        let distance = Math.sqrt((dx * dx) + (dy * dy));

        if (distance > 2) {
            if (!this.escape) {
                dx *= 1.5 / distance;
                dy *= 1.5 / distance;
            } else {
                dx += 0.1;
                dy += 0.1;
            }
        } else {
            this.followPoint = this.createFollowPoint();
            this.hasFoodTarget = false;
        }

        this.posX += dx;
        this.posY += dy;
    }

    setNewFollowPoint(newFollowX, newFollowY) {
        this.followPoint = { x: newFollowX, y: newFollowY };
    }

    createFollowPoint() {
        let offset = 150;
        let fishAreaPointA = { x: this.posX - offset, y: this.posY - offset };
        let fishAreaPointB = { x: this.posX + offset, y: this.posY + offset };

        // Make cords correction based on canvas size
        if (fishAreaPointA.x < 0) fishAreaPointA.x = 0;
        if (fishAreaPointA.y < 0) fishAreaPointA.y = 0;
        if (fishAreaPointB.x > this.c.canvas.width) fishAreaPointB.x = this.c.canvas.width;
        if (fishAreaPointB.y > this.c.canvas.height) fishAreaPointB.y = this.c.canvas.height;

        return {
            x: randomNumber(fishAreaPointA.x, fishAreaPointB.x),
            y: randomNumber(fishAreaPointA.y, fishAreaPointB.y)
        }
    }

    confusion(howLong) {
        this.escape = true;
        setTimeout(() => { this.escape = false }, howLong);
    }

    catchFood(foodsArray) {
        if (this.hungerState < this.maxHungerState) {
            foodsArray.forEach((food) => {
                // When food is near the fish will start chasing the food
                if (!this.hasFoodTarget) {
                    let eatOffset = 100;
                    if (food.posX > (this.posX - eatOffset) && food.posX < (this.posX + eatOffset) &&
                        food.posY > (this.posY - eatOffset) && food.posY < (this.posY + eatOffset)) {
                        this.hasFoodTarget = true;
                        this.setNewFollowPoint(food.posX, food.posY);
                    }
                }
    
                // When colide with food, destroy food
                if (food.posX > (this.posX - this.r) && food.posX < (this.posX + this.r) &&
                    food.posY > (this.posY - this.r) && food.posY < (this.posY + this.r)) {
                    food.isEaten = true;
                    this.hasFoodTarget = false;
                    this.hungerState += 5;
                }
            });
        }
    }
}

export default Fish;
