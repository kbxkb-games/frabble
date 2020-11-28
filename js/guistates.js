var numTiles = 100;
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
	counts: new Map(),
	sack: new Array(numTiles),
	numTilesLeft: numTiles,
	reset: function()
	{
		let i = 0;
		let alpha = "A";
		let freq = 0;
		for(let c = 65; c <= 90; c++)
		{
			alpha = String.fromCharCode(c);
			freq = i + this.counts.get(alpha);
			for(; i < freq; i++)
			{
				this.sack[i] = alpha;
			}
		}
		this.sack[i] = this.sack[i+1] = "?";
		shuffle(this.sack);
	},
	initialize: function()
	{
		this.counts.set("A", 9);
		this.counts.set("B", 2);
		this.counts.set("C", 2);
		this.counts.set("D", 4);
		this.counts.set("E", 12);
		this.counts.set("F", 2);
		this.counts.set("G", 3);
		this.counts.set("H", 2);
		this.counts.set("I", 9);
		this.counts.set("J", 1);
		this.counts.set("K", 1);
		this.counts.set("L", 4);
		this.counts.set("M", 2);
		this.counts.set("N", 6);
		this.counts.set("O", 8);
		this.counts.set("P", 2);
		this.counts.set("Q", 1);
		this.counts.set("R", 6);
		this.counts.set("S", 4);
		this.counts.set("T", 6);
		this.counts.set("U", 4);
		this.counts.set("V", 2);
		this.counts.set("W", 2);
		this.counts.set("X", 1);
		this.counts.set("Y", 2);
		this.counts.set("Z", 1);
		this.counts.set("?", 2);
		this.reset();
	},
	draw: function()
	{
		if (this.numTilesLeft <= 0)
			return "!";
		let randomIndex = randomInclusive(0, this.numTilesLeft - 1);
		let drawn = this.sack[randomIndex];
		this.sack[randomIndex] = "!";
		for(let i = randomIndex; i <= this.numTilesLeft - 2; i++)
		{
			let temp = this.sack[i+1];
			this.sack[i+1] = this.sack[i];
			this.sack[i] = temp;
		}
		this.numTilesLeft -= 1;
		return drawn;
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
