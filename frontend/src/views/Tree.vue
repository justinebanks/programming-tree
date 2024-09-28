<script setup>
import { ref, onMounted } from "vue";

let ctx = null;
let canvas = null;

let mouseDown = false;
let mouse = { x: 0, y: 0 };

let points = [];


class TreeNode {
    constructor(parent, x, y, color="white") {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.text = "Test Text";
        this.showText = false;

        this.color = color;
        
        this.children = [];
        this.parent = parent;

        if (this.parent != null) this.parent.addChild(this);
    }

    draw() {
        for (let i = 0; i < this.children.length; i++) {
            const currentNode = this.children[i];

            ctx.beginPath();
            ctx.strokeStyle = "white";
            // ctx.moveTo(this.x + this.width/2, this.y + this.height/2);
            // ctx.lineTo(currentNode.x + currentNode.width/2, currentNode.y + currentNode.height/2);
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(currentNode.x, currentNode.y);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();

        if (this.showText) {
            ctx.fillStyle = "white";
            ctx.font = "30px Inter";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, this.x, this.y, this.width);
        }
    }

    update() {
        this.draw();

        if (this.isPressed()) {
            // this.x = mouse.x - this.width/2;
            // this.y = mouse.y - this.height/2;
            this.x = mouse.x;
            this.y = mouse.y;
            console.log("CLICKED ", this.color);
        }

        if (this.isHovered()) {
            this.width = 150;
            this.showText = true;
        }
        else {
            this.width = 100;
            this.showText = false;
        }
    }

    isPressed() {
        if (this.isHovered() && mouseDown) {
            return true;
        }
        else {
            return false;
        }
    }

    isHovered() {
        // const xHovered = (mouse.x >= this.x && mouse.x <= this.x + this.width);
        // const yHovered = (mouse.y >= this.y && mouse.y <= this.y + this.height);
        const xHovered = (mouse.x >= this.x - this.width/2 && mouse.x <= this.x + this.width/2);
        const yHovered = (mouse.y >= this.y - this.width/2 && mouse.y <= this.y + this.width/2);
        
        if (xHovered && yHovered) {
            return true;
        }
        else {
            return false;
        }
    }

    addChild(nodeObj) {
        this.children.push(nodeObj);

        if (nodeObj.parent != this) {
            nodeObj.parent = this;
        }
    }

    static getLevel(nodeObject, level=0) {
        if (this.parent == null) {
            return level
        }

        this.getLevel(this.parent, level+1);
    }

}


const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 30, 30);


    for (let i = 0; i < points.length; i++) {
        points[i].update();
    }
}


onMounted(() => {
    canvas = document.getElementById("canv");
    console.log("Canvas: ", canvas);
    ctx = canvas.getContext('2d');

    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;


    canvas.addEventListener("mousedown", () => {
        mouseDown = true;
        console.log("MOUSE DOWN");
        console.log(mouse);
    })

    canvas.addEventListener("mouseup", () => {
        mouseDown = false;
    })

    canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    })



    const p1 = new TreeNode(null, 200, 200, "orange");
    const p2 = new TreeNode(p1, 350, 400,"blue");
    const p3 = new TreeNode(p1, 50, 400, "blue");

    points = [p1, p2, p3];

    animate();
});

const fillRed = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
}


</script>

<template>
    <div class="container">
        <div>The Actual Programming Tree</div>
        <canvas width="800px" height="800px" id="canv"></canvas>
        <br>
        <button @click="fillRed()">Fill Red</button>
    </div>

</template>

<style scope>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#canv {
    border: 2px solid red;
}
</style>