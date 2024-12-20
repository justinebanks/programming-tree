<script setup>
import { onMounted } from "vue";
import Axios from "axios";

let ctx = null;
let canvas = null;

let mouseDown = false; // Mouse State
let mouseOrigin = { x: 0, y: 0 }; // Origin of Mouse Movement
let mouse = { x: 0, y: 0 }; // Mouse Position Relative To Canvas

let points = [];
let root = null;
let globalOffset = { x: 0, y: 0 };


function updateTreeNodes() {
	const params = getQueryParams();

	if (params.id != undefined) {
		const newRoot = points.filter((point) => point.id == params.id)[0];
		root = newRoot;
		document.title = root.text + " - Programming Tree";
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
	} catch (TypeError) {
		return [];
	}
}

class TreeNode {
	constructor(id, parentid, x, y) {
		this.x = x;
		this.y = y;
		this.height = 150 / window.devicePixelRatio;
		this.width = this.height * 1.5;

		this.isWrapper = false;
		this.within = false;
		this.id = id;

		this.text = "Test Text";
		this.showText = true;

		this.children = [];

		this.parentid = parentid;
		this.parent = null;

		//this.level = 0;
	}

	getParent() {
		if (this.parentid == null) {
			return null;
		}

		const parents = points.filter((node) => node.id == this.parentid);

		if (parents.length == 1) {
			this.parent = parents[0];
			this.parent.addChild(this);
			return parents[0];
		} else {
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
			ctx.moveTo(this.x + globalOffset.x, (this.y + globalOffset.y) - this.height / 2);
			ctx.lineTo(this.parent.x + globalOffset.x, this.parent.y + globalOffset.y + this.height / 2);
			ctx.closePath();
			ctx.stroke();
		}

		const colors = [
			"#699fad",
			"#2b454f",
			"#314e3f",
			"#4f5d42",
			"#9a9f87",
			"#e8b26f",
			"#b6834c",
			"#704d2b",
		];

		// Actual Node
		ctx.fillStyle = "black";
		const borderWidth = 3;
		let level = TreeNode.getLevel(this);
		ctx.fillRect(
			(this.x + globalOffset.x) - (this.width + borderWidth) / 2,
			(this.y + globalOffset.y) - (this.height + borderWidth) / 2,
			this.width + borderWidth,
			this.height + borderWidth
		);

		if (!this.isHovered()) ctx.fillStyle = colors[level % colors.length];
		ctx.fillRect(
			(this.x + globalOffset.x) - this.width / 2,
			(this.y + globalOffset.y) - this.height / 2,
			this.width,
			this.height
		);

		// Node Text
		if (this.showText) {
			ctx.fillStyle = "white";
			ctx.font = "16px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(this.text, this.x + globalOffset.x, this.y + globalOffset.y, this.width - 10);
		}
	}

	update() {
		this.draw();

		if (this.isPressed()) {
			if (this.isWrapper) {
				//window.history.pushState({}, "", `/tree?id=${this.id}`);
				window.location.href = `/tree?id=${this.id}`;
				updateTreeNodes();
			} else {
				window.location.pathname = `/node/${this.id}`;
			}

			// Follow Mouse (Drag)
			// this.x = mouse.x;
			// this.y = mouse.y;
			// console.log("CLICKED ", this.color);
		}
	}

	isPressed() {
		if (this.isHovered() && mouseDown) {
			return true;
		} else {
			return false;
		}
	}

	isHovered() {

		const xHovered =
			mouse.x >= (this.x + globalOffset.x) - this.width / 2 &&
			mouse.x <= (this.x + globalOffset.x) + this.width / 2;
		const yHovered =
			mouse.y >= (this.y + globalOffset.y) - this.height / 2 &&
			mouse.y <= (this.y + globalOffset.y) + this.height / 2;

		if (xHovered && yHovered) {
			return true;
		} else {
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

	static getLevel(nodeObject) {
		if (nodeObject.parent == null) {
			return 0;
		}

		let level = 0;

		let current = nodeObject.parent;

		while (true) {
			level++;

			if (current.parent != null) {
				current = current.parent;
			} else {
				break;
			}
		}

		//console.log(level);
		return level;
	}
}

function updateChildren(top) {
	for (let child of top.children) {
		if (
			(top.id == root.id && child.within == true) ||
			(top.id != root.id && child.within == false)
		) {
			child.update();
			updateChildren(child);
		}
	}
}

// Positions Node Within the Node Tree According to the Root Node
function positionNodes(node) {
    const ratio = window.devicePixelRatio;
    const width = canvas.width / ratio;

    if (node.id == root.id) {
        root.x = width / 2;
        root.y = 100 / ratio;
    }

    let visibleChildren = node.children.filter(
        (child) =>
            (node.id == root.id && child.within == true) ||
            (node.id != root.id && child.within == false)
    );

    console.log(visibleChildren);

    visibleChildren.forEach((child, index) => {
        const relX = width / (visibleChildren.length+1);

        child.x = relX * (index+1) + (node.x - (width/2));
        child.x = child.x + (node.x - child.x) / 3;
        child.y = node.y + (200 / ratio);

        positionNodes(child);
    });
}

function dataToTreeNodes(data) {
	let nodes = [];

	for (let node of data) {
		const newNode = new TreeNode(
			node.id,
			node.parentid,
			randRange(0, canvas.width),
			randRange(0, canvas.height),
			node.color
		);

		newNode.isWrapper = node.wrapper;
		newNode.within = node.within;
		newNode.text = node.name;

		nodes.push(newNode);
	}

	return nodes;
}

const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = "rgba(0,0,0,0)";
	// ctx.fillRect(0, 0, canvas.width, canvas.height);

	root.update();
	updateChildren(root);
};

onMounted(async () => {
	Axios.defaults.withCredentials = false;

	const ratio = window.devicePixelRatio;
	const width = window.innerWidth * 0.98;
	const height = window.innerHeight;

	canvas = document.getElementById("canv");
	ctx = canvas.getContext("2d");

	canvas.width = width * ratio;
	canvas.height = height * ratio;

	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
	ctx.scale(ratio, ratio); // Fix Blurry Canvas Text: https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas

	canvas.addEventListener("mousedown", (e) => {
		mouseDown = true;

        mouseOrigin.x = e.offsetX - globalOffset.x;
        mouseOrigin.y = e.offsetY - globalOffset.y;

		console.log("Mouse: ", mouse);
	});

	canvas.addEventListener("mouseup", () => {
		mouseDown = false;
	});

	canvas.addEventListener("mousemove", (e) => {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;

        if (mouseDown) {
            globalOffset.x = (e.offsetX - mouseOrigin.x);
            globalOffset.y = (e.offsetY - mouseOrigin.y);
        }
	});

	const params = getQueryParams();
	const nodeData = await Axios.get("http://localhost:3000/nodes");
	console.log("Node Data: ", nodeData.data);

	points = dataToTreeNodes(nodeData.data);

	if (params.id == undefined) {
		root = points.filter((point) => point.parentid == null)[0];
	} else {
		root = points.filter((point) => point.id == params.id)[0];
		document.title = root.text;
	}

	// Initialize Parents of All Nodes
	for (let point of points) {
		point.getParent();
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

<style scoped>

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-bottom: 2px solid var(--dark-green);
}

</style>
