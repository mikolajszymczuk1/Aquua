import { randomNumber } from "../utilities/helpers";

class Fish {
    constructor(context, posX, posY, radius, color) {
        this.c = context;
        this.posX = posX;
        this.posY = posY;
        this.r = radius;
        this.color = color;
        this.escape = false;

        // Create first point after fish is created
        this.followPoint = this.createFollowPoint();
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.posX, this.posY, this.r, 0, 2 * Math.PI);
        this.c.fillStyle = this.color;
        this.c.fill();
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
}

export default Fish;