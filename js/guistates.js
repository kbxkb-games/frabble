var controls =
{
	uiPlayer1Stats: document.getElementById("player1-stats"),
	uiPlayer2Stats: document.getElementById("player2-stats"),
	uiPlayer1Text: document.getElementById("player-1"),
	uiPlayer2Text: document.getElementById("player-2"),
	uiGameButton: document.getElementById("gameLifecycleButton"),
};

var sackOTiles =
{
	sack: new Map(),
	numTilesLeft: 100,
	initialize: function()
	{
		this.sack.set("A", 9);
		this.sack.set("B", 2);
		this.sack.set("C", 2);
		this.sack.set("D", 4);
		this.sack.set("E", 12);
		this.sack.set("F", 2);
		this.sack.set("G", 3);
		this.sack.set("H", 2);
		this.sack.set("I", 9);
		this.sack.set("J", 1);
		this.sack.set("K", 1);
		this.sack.set("L", 4);
		this.sack.set("M", 2);
		this.sack.set("N", 6);
		this.sack.set("O", 8);
		this.sack.set("P", 2);
		this.sack.set("Q", 1);
		this.sack.set("R", 6);
		this.sack.set("S", 4);
		this.sack.set("T", 6);
		this.sack.set("U", 4);
		this.sack.set("V", 2);
		this.sack.set("W", 2);
		this.sack.set("X", 1);
		this.sack.set("Y", 2);
		this.sack.set("Z", 1);
	},
	draw: function()
	{
		if (this.numTilesLeft <= 0)
			return "!";
		//TODO: Finish this, may be change map to array for each of shuffling? Search for "javascript Fisher–Yates Shuffle"
	}
};

var readyState =
{
	focusOn: controls.uiPlayer1Text,
	namePlayer1: "",
	namePlayer2: "",
	enforce: function()
	{
		controls.uiGameButton.setAttribute("value", "New Game");
		controls.uiPlayer1Stats.style.display = "none";
		controls.uiPlayer2Stats.style.display = "none";
		controls.uiPlayer1Text.value = this.namePlayer1;
		controls.uiPlayer2Text.value = this.namePlayer2;
		controls.uiPlayer1Text.disabled = false;
		controls.uiPlayer2Text.disabled = false;
		this.focusOn.focus();
		this.focusOn.setSelectionRange(0, focusOn.value.length);

		//TODO: Bring all tiles back and refresh board/racks to initial state
	}
};

var gameOnState =
{
	playerOne:
	{
		name: "",
		score: 0,
		plays: new Map(),
		addPlay: function(addWord, addScore)
		{
			if(this.plays.has(addWord))
				addWord = addWord + "*";
			this.plays.set(addWord, addScore);
		}
	},
	playerTwo:
	{
		name: "",
		score: 0,
		plays: new Map(),
		addPlay: function(addWord, addScore)
		{
			if(this.plays.has(addWord))
				addWord = addWord + "*";
			this.plays.set(addWord, addScore);
		}
	},
	__divSelectStart: "<div style=\"padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;\"> <select style=\"text-align: left; width: 99%; background-color: #192841; color: #F6E8B1; overflow-y: auto;\" size=\"15\">",
	__divSelectEnd: "</select> </div>",
	enforce: function(updatePlayLogOnly)
	{
		let ih = "<legend>" + this.playerOne.name + " - " + this.playerOne.score + "</legend>";
		ih += this.__divSelectStart;
		for (let [key1, value1] of this.playerOne.plays)
		{
			ih += "<option style=\"font-family: Inconsolata;\" value=\"" + key1 + "\">" + justifyPlay(key1, value1, 28) + "</option>";
		}
		ih += this.__divSelectEnd;
		controls.uiPlayer1Stats.innerHTML = ih;

		ih = "<legend>" + this.playerTwo.name + " - " + this.playerTwo.score + "</legend>";
		ih += this.__divSelectStart;
		for (let [key2, value2] of this.playerTwo.plays)
		{
			ih += "<option style=\"font-family: Inconsolata;\" value=\"" + key2 + "\">" + justifyPlay(key2, value2, 28) + "</option>";
		}
		ih += this.__divSelectEnd;
		controls.uiPlayer2Stats.innerHTML = ih;
		if (updatePlayLogOnly) return;
		
		controls.uiPlayer1Text.disabled = true;
		controls.uiPlayer2Text.disabled = true;
		controls.uiGameButton.setAttribute("value", "Abort Game");
		controls.uiPlayer1Stats.style.display = "block";
		controls.uiPlayer2Stats.style.display = "block";
	},
	reset: function()
	{
		this.playerOne.name = this.playerTwo.name = "";
		this.playerOne.score = this.playerTwo.score = 0;
		this.playerOne.plays.clear();
		this.playerTwo.plays.clear();
	}
};
