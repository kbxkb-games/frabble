//Global variables. Always access them using "window.<name>"...
var numCellsSquare = 15;
var numCellsWide = window.numCellsSquare;
var numCellsHigh = window.numCellsSquare;
var numCells = window.numCellsWide * window.numCellsHigh;
var numTiles = 100;
var cells = new Array(window.numCells);

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

function initCellsArray()
{
	for (let cell = 0; cell < window.numCells; cell++)
	{
		window.cells[cell] = document.getElementById(getCartesianZeroBasedIdFromArrayIndex(cell));
		//The following startup logic is just for now. Real game will not set innerTexts like this...
		if (cell < window.numTiles)
			cells[cell].innerText = String.fromCharCode(getCharCodeFromIndex(cell));
		else
			cells[cell].innerText = "";
	}
}

function setUp()
{
	initCellsArray();
	setDraggableDroppable(window.cells);
}
