import { randomNumber } from "../utilities/helpers";

class Fish {
    constructor(context, posX, posY, radius) {
        this.c = context;
        this.posX = posX;
        this.posY = posY;
        this.r = radius;
        this.followPointX = 0;
        this.followPointY = 0;
        this.createFollowPoint();
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.posX, this.posY, this.r, 0, 2 * Math.PI);
        this.c.fill();
    }

    update() {
        let dx = (this.followPointX - this.posX) * .125;
        let dy = (this.followPointY - this.posY) * .125;
        let distance = Math.sqrt((dx * dx) + (dy * dy));

        if (distance > 2) {
            dx *= 2 / distance;
            dy *= 2 / distance
        } else {
            this.createFollowPoint();
        }

        this.posX += dx;
        this.posY += dy;
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

        this.followPointX = randomNumber(fishAreaPointA.x, fishAreaPointB.x);
        this.followPointY = randomNumber(fishAreaPointA.y, fishAreaPointB.y);
    }
}

export default Fish;
