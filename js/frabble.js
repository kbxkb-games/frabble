//Global variables. Always access them using "window.<name>"...
var numCellsSquare = 15;
var numCellsWide = window.numCellsSquare;
var numCellsHigh = window.numCellsSquare;
var numCells = window.numCellsWide * window.numCellsHigh;
var numTiles = 100;
var numRackCells = 7;
var cells = new Array(window.numCells);
var rackCells = new Array(window.numRackCells);

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
		//if (cell < window.numTiles)
		//	window.cells[cell].innerHTML = getTileInnerHTML(String.fromCharCode(getCharCodeFromIndex(cell)));
	}
	for (let rackCell = 0; rackCell < window.numRackCells; rackCell++)
	{
		window.rackCells[rackCell] = document.getElementById("r-" + rackCell);
	}
}

function setUp()
{
	initCellsArray();
	window.cells.forEach(item => {
		styleCellBasedOnContents(item);
	});
	//for (let rackCell = 0; rackCell < window.numRackCells; rackCell++)
	//{
	//	styleCellBasedOnContents(window.rackCells[rackCell]);
	//}
	window.rackCells.forEach(rItem => {
		styleCellBasedOnContents(rItem);
	});
}
