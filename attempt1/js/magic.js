var numCellsSquare = 15
var numCellsWide = numCellsSquare;
var numCellsHigh = numCellsSquare;
var cellWidthPx = 32;
var cellHeightPx = 32;
var columnGapPx = 5;
var imgWidth = cellWidthPx - 2;
var imgHeight = cellHeightPx - 2;
var leftX = 0;
var topY = 0;
var numCells = numCellsWide * numCellsHigh;
var numTiles = 100;
var moving = false;
var movingCell = null;
var movingCellsImage = null;

function getArrayIndexFromCartesianZeroBasedId(czbId)
{
	let rowcol = czbId.split("-"); 
	let iRow = parseInt(rowcol[0]);
	let iCol = parseInt(rowcol[1]);
	return (iRow * numCellsSquare) + iCol;

}
function getCartesianZeroBasedIdFromArrayIndex(index)
{
	let iCol = index % numCellsSquare;
	let iRow = (index - iCol) / numCellsSquare;
	return(iRow + "-" + iCol);
}
function getOffset(elem)
{
	const rectangle = elem.getBoundingClientRect();
	let elemLeft = rectangle.left + window.scrollX;
	let elemTop = rectangle.top + window.scrollY;
	return [elemLeft, elemTop];
}
function getArrayIndexFromXY(x, y)
{
	if (x < leftX || x > rightX || y < topY || y > bottomY )
		return -1;
	let iCol = ((x - leftX) - ((x - leftX) % cellWidthPx)) / cellWidthPx;
	let iRow = ((y - topY) - ((y - topY) % cellHeightPx)) / cellHeightPx;
	return getArrayIndexFromCartesianZeroBasedId(iRow + "-" + iCol);
}

function getRandomInt(min, max)
{
    let minLocal = Math.ceil(min);
    let maxLocal = Math.floor(max);
    return Math.floor(Math.random() * (maxLocal - minLocal + 1)) + minLocal;
}
function moveCell(e)
{
	console.log("inside moveCell()...");
	if (movingCell != null && moving)
	{
		movingCell.setAttribute("isMoving", 1);
		//if (movingCell.firstChild != null)
		//	movingCell.removeChild(movingCell.children[0]);
		let newX = e.clientX - (cellWidthPx / 2);
		let newY = e.clientY - (cellHeightPx / 2);
		movingCell.style.gridColumnStart = "10";
		movingCell.style.gridRowStart = "6";
		//movingCell.style.position = "absolute";
		//movingCellsImage.style.left = e.clientX - (cellWidthPx / 2);
		//movingCellsImage.style.top = e.clientY - (cellHeightPx / 2);
	}
}
function onCellClick(e)
{
	if (e.button == 0)
	{
		if(moving)
		{
			moving = false;
			console.log("about to stop moving");
			document.removeEventListener("mousemove", moveCell);
			let movingCellLocal = movingCell;
			let movingCellsImageLocal = movingCellsImage;
			movingCell = null;
			movingCellsImage = null;
			if (movingCellLocal.getAttribute("isMoving") == 1)
			{
				movingCellLocal.setAttribute("isMoving", 0);
				//return dragging cell to original position
				//movingCellLocal.style.position = "relative";
				movingCellLocal.style.left = movingCellLocal.getAttribute("leftX");
				movingCellLocal.style.top = movingCellLocal.getAttribute("topY");
			}
			return;
		}
		movingCell = this;
		movingCellsImage = this.firstChild;
		console.log(movingCellsImage);
		document.addEventListener("mousemove", moveCell, false);
		moving = true;
	}
	else if (e.button == 2)
	{
		e.preventDefault();
		let imageOfThis = this.firstChild;
        	alert("id = " + this.getAttribute("id") + ", array index = " + this.getAttribute("arrayIndex"));
        	alert("left X = " + this.getAttribute("leftX") + ", right X = " + this.getAttribute("rightX") + ", top Y = " + this.getAttribute("topY") + ", bottom Y = " + this.getAttribute("bottomY"));
        	if (imageOfThis != null)
                	alert(imageOfThis.getAttribute("id"));
	}
}
function getCharCodeFromIndex(index)
{
	if (index < 9)
		return 65; //A
	else if (index < 11)
		return 66; //B
	else if (index < 13)
		return 67; //C
	else if (index < 17)
		return 68; //D
	else if (index < 29)
		return 69; //E
	else if (index < 31)
		return 70; //F
	else if (index < 34)
		return 71; //G
	else if (index < 36)
		return 72; //H
	else if (index < 45)
		return 73; //I
	else if (index < 46)
		return 74; //J
	else if (index < 47)
		return 75; //K
	else if (index < 51)
		return 76; //L
	else if (index < 53)
		return 77; //M
	else if (index < 59)
		return 78; //N
	else if (index < 67)
		return 79; //O
	else if (index < 69)
		return 80; //P
	else if (index < 70)
		return 81; //Q
	else if (index < 76)
		return 82; //R
	else if (index < 80)
		return 83; //S
	else if (index < 86)
		return 84; //T
	else if (index < 90)
		return 85; //U
	else if (index < 92)
		return 86; //V
	else if (index < 94)
		return 87; //W
	else if (index < 95)
		return 88; //X
	else if (index < 97)
		return 89; //Y
	else if (index < 98)
		return 90; //Z
	else
		return -1; //blank
}
function generateUUID()
{
	let d = new Date().getTime();//Timestamp
	let d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		let r = Math.random() * 16;//random number between 0 and 16
		if(d > 0)
		{//Use timestamp until depleted
			r = (d + r)%16 | 0;
			d = Math.floor(d/16);
		}
		else
		{//Use microseconds since page-load if supported
			r = (d2 + r)%16 | 0;
			d2 = Math.floor(d2/16);
		}
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

//load images...
let alphaImages = new Array(numTiles);
for (var im = 0; im < numTiles; im++)
{
	let charCode = getCharCodeFromIndex(im);
	let letter = "";
	if (charCode > 0)
		letter = String.fromCharCode(charCode);

	alphaImages[im] = document.createElement("img");
	alphaImages[im].setAttribute("src", "https://place-hold.it/"
		+ imgWidth + "x" + imgHeight + "/0000ff/ffffff&bold&text=" + letter + "&fontsize=17");
	alphaImages[im].setAttribute("alt", letter);
	alphaImages[im].setAttribute("width", imgWidth);
	alphaImages[im].setAttribute("height", imgHeight);
	alphaImages[im].setAttribute("id", "[" + letter + "]-" + generateUUID());
}
let bogusImages = new Array(225 - numTiles);
for (var bg = 0; bg < 125; bg++)
{
	bogusImages[bg] = document.createElement("img");
	bogusImages[bg].setAttribute("src", "https://place-hold.it/"
		+ imgWidth + "x" + imgHeight + "/0000ff/ffffff&bold&text=$&fontsize=17");
	bogusImages[bg].setAttribute("alt", "$");
	bogusImages[bg].setAttribute("width", imgWidth);
	bogusImages[bg].setAttribute("height", imgHeight);
	bogusImages[bg].setAttribute("id", "[$]-" + generateUUID());
}

//init cells array...
let cells = new Array(numCells);
for (var x = 0; x < numCells; x++)
{
	let cellId = getCartesianZeroBasedIdFromArrayIndex(x);
	let rowcol = cellId.split("-"); 
	let iRow = parseInt(rowcol[0]);
	let iCol = parseInt(rowcol[1]);
	cells[x] = document.getElementById(cellId);
	cells[x].setAttribute("arrayIndex", x);
	cells[x].setAttribute("isMoving", 0);

	let innerRowCoOrds = getOffset(document.getElementById("row-" + iRow));
	cells[x].setAttribute("leftX", innerRowCoOrds[0] + (cellWidthPx + columnGapPx) * iCol)
	cells[x].setAttribute("topY", innerRowCoOrds[1]);
	cells[x].setAttribute("rightX", parseFloat(cells[x].getAttribute("leftX")) + cellWidthPx);
	cells[x].setAttribute("bottomY", parseFloat(cells[x].getAttribute("topY")) + cellHeightPx);
	if (x < numTiles)
		cells[x].appendChild(alphaImages[x]);
	else
		cells[x].appendChild(bogusImages[x-numTiles]);

	//cells[x].addEventListener("mouseup", onCellClick, false);
	cells[x].addEventListener("mousedown", onCellClick, false);
	cells[x].addEventListener("contextmenu", function(evt) {evt.preventDefault();}, false);
}
