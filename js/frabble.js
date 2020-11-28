//Global variables. Always access them using "window.<name>"...
var numCellsSquare = 15;
var numCellsWide = window.numCellsSquare;
var numCellsHigh = window.numCellsSquare;
var numCells = window.numCellsWide * window.numCellsHigh;
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
	}
	for (let rackCell = 0; rackCell < window.numRackCells; rackCell++)
	{
		window.rackCells[rackCell] = document.getElementById("r-" + rackCell);
	}
	//sackOTiles.initialize();
	//window.cells[randomInclusive(0, window.numCells)].innerHTML = getTileInnerHTML(sackOTiles.draw());
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
	if (gameOnState.isGameOn())
	{
		if (confirm("Game already in Progress! Press OK to abort ongoing game"))
		{
			readyState.namePlayer1 = gameOnState.playerOne.name;
			readyState.namePlayer2 = gameOnState.playerTwo.name;
			readyState.focusOn = controls.uiPlayer1Text;
			gameOnState.reset();
			readyState.enforce();
		}
		return;
	}

	let player1 = controls.uiPlayer1Text.value.trim();
	let player2 = controls.uiPlayer2Text.value.trim();
	if (player1 === "")
	{
		alert("Please enter a name for Player 1");
		readyState.namePlayer1 = player1;
		readyState.namePlayer2 = player2;
		readyState.focusOn = controls.uiPlayer1Text;
		readyState.enforce();
		return;
	}
	if (player2 === "")
	{
		alert("Please enter a name for Player 2");
		readyState.namePlayer1 = player1;
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
	gameOnState.playerOne.name = player1;
	gameOnState.playerTwo.name = player2;
	gameOnState.playerOne.score = gameOnState.playerTwo.score = 0;
	gameOnState.currPlayer = 1;
	gameOnState.enforce(false);
	sackOTiles.initialize();
	alert("Pass to " + player1);

	//TO add a played word to play log:
	//gameOnState.playerOne.addPlay("HJGDFYGYWE", 90);
	//gameOnState.playerTwo.addPlay("HOWZZAT", 150);
	//gameOnState.enforce(true);
	
	//NEXT: Inside gameOnState, just added currPlayer, set it to 1 above
	//Next, add array tiles inside gameOnState.playerOne and .playerTwo, populate the array, and create
	//mechanism for oscillation during gameplay, add display of tiles in gameOnState.enforce()
}
