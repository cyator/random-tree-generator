// import Tree from './tree.js';
const canvas = document.getElementById('canvas');
const generateButton = document.querySelector('.generate-tree-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// const tree = new Tree(ctx, start, 120, 2, color);
// tree.drawTree(0);

function drawTree(startX, startY, length, angle, branchWidth, color1, color2) {
	ctx.beginPath();
	ctx.save(); //saves current canvas state and pushes it to stack
	ctx.strokeStyle = color1;
	ctx.fillStyle = color2;
	ctx.branchWidth = branchWidth;
	ctx.translate(startX, startY);
	ctx.rotate(angle * (Math.PI / 180)); // converts degrees to radians
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -length);
	ctx.stroke();

	// stops recursive function
	if (length < 10) {
		ctx.restore(); //restores most recently saved canvas state by popping top of canvas drawing stack
		return;
	}
	drawTree(0, -length, length * 0.75, angle + 5, branchWidth);
	drawTree(0, -length, length * 0.75, angle - 5, branchWidth);
	ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 2, 'brown', 'green');
