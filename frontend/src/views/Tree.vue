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
        positionNodes(root);
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
    constructor(id, parentid, x, y, color="white") {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 100;

        this.isWrapper = false;
        this.id = id

        this.text = "Test Text";
        this.showText = true;

        this.baseColor = color;
        this.color = color;
        
        this.children = [];

        this.parentid = parentid;
        this.parent = null;

    }

    getParent() {
        const parents = points.filter(node => node.id == this.parentid);

        if (parents.length == 1) {
            this.parent = parents[0];
            this.parent.addChild(this);
            return parents[0];
        }
        else {
            console.log("PARENT RETRIEVAL ERROR");
        }
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
        ctx.fillStyle = "black";
        const borderWidth = 4;
        ctx.fillRect(this.x-((this.width+borderWidth)/2), this.y-((this.height+borderWidth)/2), this.width+borderWidth, this.height+borderWidth);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
        // ctx.closePath();
        // ctx.fill();

        // Node Text
        if (this.showText) {
            ctx.fillStyle = "white";
            ctx.font = "25px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, this.x, this.y, this.width-10);
        }
    }

    update() {
        if (this.parent == null && this.id != root.id) this.getParent();
        this.draw();

        if (this.isPressed()) {
            if (this.isWrapper) {
                window.history.pushState({}, "", `/tree?id=${this.id}`);
                updateTreeNodes();
            }
            else {
                window.location.pathname = `/node/${this.id}`;
            }

            // Follow Mouse (Drag)
            // this.x = mouse.x;
            // this.y = mouse.y;
            // console.log("CLICKED ", this.color);
        }

        if (this.isHovered()) {
            this.color = "black";
        }
        else {
            this.color = this.baseColor;
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

        return children;
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

function updateChildren(root) {
    for (let child of root.children) {
        child.update();

        if (child.isWrapper == false) {
            updateChildren(child);
        }
    }
}

// Positions Node Within the Node Tree According to the Root Node
function positionNodes(node) {
    setTimeout(() => {
        if (node.id == root.id) {
            root.x = canvas.width/2
            root.y = 100;
        }

        node.children.forEach((child, index) => {
            const relX = canvas.width/(node.children.length+1)

            child.x = relX * (index+1) + (node.x - canvas.width/2);
            child.y = node.y + 150;

            positionNodes(child);
            
        })
    }, 250);
}

function dataToTreeNodes(data) {
    let nodes = [];

    for (let node of data) {
        const newNode = new TreeNode(
            node.id, 
            node.parentid,
            randRange(0, canvas.width), 
            randRange(0, canvas.height), 
            node.color);
        
        if (node.wrapper == true) newNode.isWrapper = true;
        newNode.text = node.name;

        nodes.push(newNode);
    }

    return nodes;
}


const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    root.update();
    updateChildren(root);
}



onMounted(async () => {
    canvas = document.getElementById("canv");
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


    const nodeData = await Axios.get("https://localhost:8433/nodes");
    console.log("Node Data: ", nodeData.data);

    points = dataToTreeNodes(nodeData.data);
    root = points.filter(point => point.parentid == null)[0];

    // Initialize Parents of All Nodes
    for (let point of points) {
        point.update();
    }

    positionNodes(root);
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