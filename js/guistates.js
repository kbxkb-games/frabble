var controls =
{
	uiPlayer1Stats: document.getElementById("player1-stats"),
	uiPlayer2Stats: document.getElementById("player2-stats"),
	uiPlayer1Text: document.getElementById("player-1"),
	uiPlayer2Text: document.getElementById("player-2"),
	uiGameButton: document.getElementById("gameLifecycleButton"),
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
		plays: new Map()
	},
	playerTwo:
	{
		name: "",
		score: 0,
		plays: new Map()
	},
	__divSelectStart: "<div style=\"padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;\"> <select style=\"text-align: left; width: 99%;\" size=\"15\">",
	__divSelectEnd: "</select> </div>",
	enforce: function()
	{
		alert("gameOnState.enforce() called");
		controls.uiPlayer1Text.disabled = true;
		controls.uiPlayer2Text.disabled = true;
		controls.uiGameButton.setAttribute("value", "Abort Game");

		let ih = "<legend>" + this.playerOne.name + " - " + this.playerOne.score + "</legend>";
		ih += this.__divSelectStart;
		for (let [key, value] of this.playerOne.plays)
		{
			ih += "<option style=\"font-family: VT323\" value=\"" + key + "\">" + justifyPlay(key, value, 35) + "</option>";
		}
		ih += this.__divSelectEnd;

		controls.uiPlayer1Stats.innerHTML = ih;
		controls.uiPlayer1Stats.style.display = "block";
		controls.uiPlayer2Stats.style.display = "block";
	},
	reset: function()
	{
		this.playerOne.name = this.playerTwo.name = "";
		this.playerOne.score = this.playerTwo.score = 0;
	}
};
