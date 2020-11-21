//Global variables. Always access them using "window.<name>"...
var numCellsSquare = 15;
var numCellsWide = window.numCellsSquare;
var numCellsHigh = window.numCellsSquare;
var numCells = window.numCellsWide * window.numCellsHigh;
var numTiles = 100;
var numRackCells = 7;
var cells = new Array(window.numCells);
var rackCells = new Array(window.numRackCells);
var isGameOngoing = false;
var playerOneName = "";
var playerTwoName = "";

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
	window.rackCells.forEach(rItem => {
		styleCellBasedOnContents(rItem);
	});
	window.playerOneName = "";
	window.playerTwoName = "";
	readyState.enforce();
}

function playerOneKeyDown(e)
{
	let key = e.keyCode || e.which;
	if (key == 13)
		document.getElementById("player-2").focus();
}

function playerTwoKeyDown(e)
{
        let key = e.keyCode || e.which;
        if (key == 13)
		newGame();
}

function newGame()
{
	if (window.isGameOngoing)
	{
		if (confirm("Press OK to abort ongoing game"))
		{
			window.isGameOngoing = false;
			readyState.namePlayer1 = window.playerOneName;
			readyState.namePlayer2 = window.playerTwoName;
			readyState.focusOn = controls.uiPlayer1Text;
			window.playerOneName = "";
			window.playerTwoName = "";
			readyState.enforce();
		}
		return;
	}

	window.playerOneName = "";
	window.playerTwoName = "";
	let player1 = controls.uiPlayer1Text.value.trim();
	let player2 = controls.uiPlayer2Text.value.trim();
	if (player1 === "")
	{
		alert("Please enter a name for Player 1");
		readyState.namePlayer1 = player1;
		readyState.focusOn = controls.uiPlayer1Text;
		readyState.enforce();
		return;
	}
	if (player2 === "")
	{
		alert("Please enter a name for Player 2");
		readyState.namePlayer2 = player2;
		readyState.focusOn = controls.uiPlayer2Text;
		readyState.enforce();
		return;
	}
	if (player1 == player2)
	{
		alert("Please enter different names for the players!");
		readyState.namePlayer1 = player1;
		readyState.namePlayer2 = player2;
		readyState.focusOn = controls.uiPlayer1Text;
		readyState.enforce();
		return;
	}

	//game on!
	window.isGameOngoing = true;
	window.playerOneName = player1;
	window.playerTwoName = player2;
	gameOnState.namePlayer1 = window.playerOneName;
	gameOnState.namePlayer2 = window.playerTwoName;
	gameOnState.enforce();
	alert("Pass to " + player1);
}
