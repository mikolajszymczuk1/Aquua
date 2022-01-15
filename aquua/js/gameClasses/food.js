class Food {
    constructor(context, posX, posY, radius) {
        this.c = context;
        this.posX = posX;
        this.posY = posY;
        this.r = radius;
        this.isEaten = false;
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.posX, this.posY, this.r, 0, 2 * Math.PI);
        this.c.fillStyle = "pink";
        this.c.fill();
    }

    update() {
        this.posY += 0.8;
    }

    isOutOfAquarium = () => this.posY > this.c.canvas.height;
}

export default Food;
