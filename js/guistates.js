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
	namePlayer1: "",
	namePlayer2: "",
	enforce: function()
	{
		controls.uiPlayer1Text.disabled = true;
		controls.uiPlayer2Text.disabled = true;
		controls.uiGameButton.setAttribute("value", "Abort Game");
		controls.uiPlayer1Stats.style.display = "block";
		controls.uiPlayer2Stats.style.display = "block";
		controls.uiPlayer1Stats.innerHTML = "<legend>" + this.namePlayer1 + "</legend>";
		controls.uiPlayer2Stats.innerHTML = "<legend>" + this.namePlayer2 + "</legend>";
	}
};
