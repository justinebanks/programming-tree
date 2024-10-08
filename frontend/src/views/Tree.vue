<script setup>
import { ref, onMounted } from "vue";
import Axios from "axios";


let ctx = null;
let canvas = null;

let mouseDown = false;
let mouse = { x: 0, y: 0 };

let points = [];
let root = null;


function updateTreeNodes() {
    const params = getQueryParams();

    if (params.id != undefined) {
        const newRoot = points.filter(point => point.id == params.id)[0];
        root = newRoot;
    }
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function getQueryParams() {
    try {
        const paramsList = window.location.href.split("?")[1].split("&");
        let params = {};

        for (let param of paramsList) {
            params[param.split("=")[0]] = param.split("=")[1];
        }

        return params;
    }
    catch (TypeError) {
        return [];
    }
}


class TreeNode {
    constructor(id, parent, x, y, color="white") {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.isWrapper = false;
        this.id = id

        this.text = "Test Text";
        this.showText = false;

        this.color = color;
        
        this.children = [];
        this.parent = parent;

        console.log("Parent: ", this.parent);
        if (this.parent != null) this.parent.addChild(this);
    }

    draw() {
        // Line To Parent
        if (this.parent != null && root.id != this.id) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            //ctx.moveTo(this.x + this.width/2, this.y + this.height/2);
            //ctx.lineTo(currentNode.x + currentNode.width/2, currentNode.y + currentNode.height/2);
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.parent.x, this.parent.y);
            ctx.closePath();
            ctx.stroke();
        }

        // Actual Node
        ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();

        // Node Text
        if (this.showText) {
            ctx.fillStyle = "white";
            //ctx.font = "30px Inter";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, this.x, this.y, this.width);
        }
    }

    update() {
        this.draw();

        if (this.isPressed()) {
            //this.x = mouse.x - this.width/2;
            //this.y = mouse.y - this.height/2;

            if (this.isWrapper) {
                window.history.pushState({}, "", `/tree?id=${this.id}`);
                updateTreeNodes();
            }
            else {
                console.log(window.location.pathname);
                window.location.pathname = `/node/${this.id}`;
            }

            // Follow Mouse (Drag)
            // this.x = mouse.x;
            // this.y = mouse.y;
            // console.log("CLICKED ", this.color);
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
        //const xHovered = (mouse.x >= this.x && mouse.x <= this.x + this.width);
        //const yHovered = (mouse.y >= this.y && mouse.y <= this.y + this.height);
        const xHovered = (mouse.x >= this.x - this.width/2 && mouse.x <= this.x + this.width/2);
        const yHovered = (mouse.y >= this.y - this.width/2 && mouse.y <= this.y + this.width/2);
        
        if (xHovered && yHovered) {
            return true;
        }
        else {
            return false;
        }
    }


    getAllChildren() {
        let children = [];

        if (this.children.length == 0) return children;

        for (let child of this.children) {
            children.push(child);

            children.push(...child.getAllChildren());
        }

        //console.log(children);
        return children;
    }


    addChild(nodeObj) {
        this.children.push(nodeObj);

        if (nodeObj.parent != this) {
            nodeObj.parent = this;
        }
    }


    changeParent(newParent) {
        let removalId = -1;

        for (let i = 0; i < this.parent.children.length; i++) {
            if (this.parent.children[i].id == this.id) {
                removalId = i;
            }
        }

        if (removalId != -1) {
            this.parent.children.splice(removalId, 1);
        }


        this.parent = newParent;

        const matches = newParent.children.filter((child) => child.id == this.id);

        if (matches.length == 0) {
            newParent.addChild(this);
        }
    }


    static getLevel(nodeObject, level=0) {
        if (this.parent == null) {
            return level
        }

        this.getLevel(this.parent, level+1);
    }

}

function updateChildren(root) {
    for (let child of root.children) {
        child.update();

        if (child.isWrapper == false) {
            updateChildren(child);
        }
    }
}

function dataToTreeNodes(data) {
    let nodes = [];

    for (let node of data) {
        const newNode = new TreeNode(
            node.id, 
            nodes.filter((n => n.id == node.parentid))[0], 
            randRange(0, canvas.width), 
            randRange(0, canvas.height), 
            node.color);
        
        if (node.wrapper == true) newNode.isWrapper = true;

        nodes.push(newNode);
    }

    return nodes;
}


const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 30, 30);

    root.update();
    updateChildren(root);
}



onMounted(async () => {
    canvas = document.getElementById("canv");
    console.log("Canvas: ", canvas);
    ctx = canvas.getContext('2d');

    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;

    const interFont = new FontFace("Inter", "url(https://fonts.gstatic.com/s/inter/v18/UcCm3FwrK3iLTcvnUwgT9nA2.woff2)");
    
    interFont.load().then((font) => {
        document.fonts.add(font);
        ctx.font = "30px Inter";
    });

    canvas.addEventListener("mousedown", () => {
        mouseDown = true;
        console.log("Mouse: ", mouse);
    })

    canvas.addEventListener("mouseup", () => {
        mouseDown = false;
    })

    canvas.addEventListener("mousemove", (e) => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    })


    const nodeData = await Axios.get("http://localhost:8080/nodes");
    console.log("Data: ", nodeData.data);

    points = dataToTreeNodes(nodeData.data);
    root = points.filter(point => point.parentid == null)[0];


    // const p1 = new TreeNode(1, null, 200, 200, "orange");
    // const p2 = new TreeNode(2, p1, 350, 400,"blue");
    // const p3 = new TreeNode(3, p1, 50, 400, "blue");

    // const p4 = new TreeNode(4, p2, 200, 600, "green");
    // const p5 = new TreeNode(5, p2, 500, 600, "green");

    // p2.isWrapper = true;
    // p1.isWrapper = true;


    // points = [p1, p2, p3, p4, p5];
    // root = p1;

    animate();
});

</script>

<template>
    <div class="container">
        <canvas width="800px" height="800px" id="canv"></canvas>
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