// import Tree from './tree.js';
const canvas = document.getElementById('canvas');
const generateButton = document.querySelector('.gen-tree-btn');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve = 10;
let curve2 = 0;
// const tree = new Tree(ctx, start, 120, 2, color);
// tree.drawTree(0);

function drawTree(startX, startY, length, angle, branchWidth, color1, color2) {
	ctx.beginPath();
	ctx.save(); //saves current canvas state and pushes it to stack
	ctx.strokeStyle = color1;
	ctx.fillStyle = color2;
	ctx.shadowBlur = 15;
	ctx.shadowColor = 'black';
	ctx.lineWidth = branchWidth;
	ctx.translate(startX, startY);
	ctx.rotate(angle * (Math.PI / 180)); // converts degrees to radians
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -length);
	//using bezier curves for natural look
	if (angle > 0) {
		ctx.bezierCurveTo(curve, -length / 2, 20, -length / 2, 0, -length);
	} else {
		ctx.bezierCurveTo(curve, -length / 2, -20, -length / 2, 0, -length);
	}

	ctx.stroke();

	// stops recursive function
	if (length < 5) {
		//draw leaves
		ctx.beginPath();
		ctx.arc(0, -length, 10, 0, Math.PI / 2);
		ctx.fill();
		ctx.restore(); //restores most recently saved canvas state by popping top of canvas drawing stack
		return;
	}
	drawTree(0, -length, length * 0.75, angle + curve, branchWidth * 0.6);
	drawTree(0, -length, length * 0.75, angle - curve, branchWidth * 0.6);
	ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 25, 'brown', 'green');

function generateRandomTree() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const centerPointX = canvas.width / 2;
	const length = Math.floor(Math.random() * 20 + 100);
	const branchWidth = Math.random() * 70 + 1;
	const color1 = `rgb(${Math.random() * 250},${Math.random() * 250},${
		Math.random() * 250
	})`;
	const color2 = `rgb(${Math.random() * 250},${Math.random() * 250},${
		Math.random() * 250
	})`;
	generateButton.style.background = color1;
	curve = Math.random() * 20 + 10;
	curve2 = Math.random() * 50;
	drawTree(
		centerPointX,
		canvas.height - 80,
		length,
		0,
		branchWidth,
		color1,
		color2
	);
}

generateButton.addEventListener('click', generateRandomTree);
