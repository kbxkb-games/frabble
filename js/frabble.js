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
	let player1Stats = document.getElementById("player1-stats");
	player1Stats.style.display = "none";
	let player2Stats = document.getElementById("player2-stats");
	player2Stats.style.display = "none";
	document.getElementById("player-1").focus();
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
	let player1Stats = document.getElementById("player1-stats");
	let player2Stats = document.getElementById("player2-stats");
	let player1Text = document.getElementById("player-1");
	let player2Text = document.getElementById("player-2");
	if (window.isGameOngoing)
	{
		if (confirm("Press OK to abort ongoing game"))
		{
			player1Stats.style.display = "none";
			player2Stats.style.display = "none";
			window.isGameOngoing = false;
			player1Text.focus();
			newGame();
		}
		return;
	}

	let player1 = player1Text.value.trim();
	let player2 = player2Text.value.trim();
	if (player1 === "")
	{
		alert("Please enter a name for Player 1");
		player1Text.value = player1;
		player1Text.focus();
		player1Text.setSelectionRange(0, player1Text.value.length);
		return;
	}
	if (player2 === "")
	{
		alert("Please enter a name for Player 2");
		player2Text.value = player2;
		player2Text.focus();
		player2Text.setSelectionRange(0, player2Text.value.length);
		return;
	}
	if (player1 == player2)
	{
		alert("Please enter different names for the players!");
		player2Text.value = player2;
		player1Text.value = player1;
		player1Text.focus();
		player1Text.setSelectionRange(0, player1Text.value.length);
		return;
	}

	//game on!
	window.isGameOngoing = true;
	player1Text.value = "";
	player2Text.value = "";
	player1Stats.innerHTML = "<legend>" + player1 + "</legend>";
	player1Stats.style.display = "block";
	player2Stats.innerHTML = "<legend>" + player2 + "</legend>";
	player2Stats.style.display = "block";
	alert("Pass to " + player1);
	player1Text.focus();
}
