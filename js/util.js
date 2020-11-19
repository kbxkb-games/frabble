//Useful function we may need later... it shuffles an array and returns the shuffled array
// shuffle the array
const shuffle = (arr) => {
    const copy = [...arr];
    // loop over the array
    for(let i = 0; i < copy.length; i++) {
        // for each index,i pick a random index j 
        let j = parseInt(Math.random()*copy.length);
        // swap elements at i and j
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }   
    return copy;
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
		return 63; //question mark
}

function getScoreFromLetter(letter)
{
	switch(letter)
	{
		case "A":
		case "E":
		case "I":
		case "L":
		case "N":
		case "O":
		case "R":
		case "S":
		case "T":
		case "U":
			return 1;
		case "D":
		case "G":
			return 2;
		case "B":
		case "C":
		case "M":
		case "P":
			return 3;
		case "F":
		case "H":
		case "V":
		case "W":
		case "Y":
			return 4;
		case "K":
			return 5;
		case "J":
		case "X":
			return 8;
		case "Q":
		case "Z":
			return 10;
		default:
			return 0;
	}
}

function getTileInnerHTML(letter)
{
	if (letter.length <= 0)
		return "";

	let retHTML = "<span class=\"primaryletter\">" + letter + "</span>";
	score = getScoreFromLetter(letter);
	if (score > 0)
		retHTML += "<span class=\"secondaryscore\"><sub>&nbsp;" + score + "</sub></span>";
	return retHTML;
}

function setBackgroundImageIfEmpty(cellDiv)
{
	let rowcol = cellDiv.getAttribute("id").split("-");
	if (isNaN(rowcol[0])) return;
	let iRow = parseInt(rowcol[0]);
	let iCol = parseInt(rowcol[1]);

	if ((iRow == 0 && (iCol == 0 || iCol == 7 || iCol == 14)) ||
		(iRow == 7 && (iCol == 0 || iCol == 14)) ||
		(iRow == 14 && (iCol == 0 || iCol == 7 || iCol == 14)))
	{
		cellDiv.style.backgroundImage = "url('images/3xword.png')";
		cellDiv.style.backgroundRepeat = "no-repeat";
		cellDiv.style.backgroundPosition = "50% 50%";
		cellDiv.style.backgroundSize = "cover";
	}
	else if ((iRow == 1 && (iCol == 1 || iCol == 13)) || 
		(iRow == 2 && (iCol == 2 || iCol == 12)) || 
		(iRow == 3 && (iCol == 3 || iCol == 11)) || 
		(iRow == 4 && (iCol == 4 || iCol == 10)) || 
		(iRow == 10 && (iCol == 4 || iCol == 10)) || 
		(iRow == 11 && (iCol == 3 || iCol == 11)) || 
		(iRow == 12 && (iCol == 2 || iCol == 12)) || 
		(iRow == 13 && (iCol == 1 || iCol == 13)))
	{
		cellDiv.style.backgroundImage = "url('images/2xword.png')";
		cellDiv.style.backgroundRepeat = "no-repeat";
		cellDiv.style.backgroundPosition = "50% 50%";
		cellDiv.style.backgroundSize = "cover";
	}
	else if ((iRow == 1 && (iCol == 5 || iCol == 9)) ||
		(iRow == 5 && (iCol == 1 || iCol == 5 || iCol == 9 || iCol == 13)) ||
		(iRow == 9 && (iCol == 1 || iCol == 5 || iCol == 9 || iCol == 13)) ||
		(iRow == 13 && (iCol == 5 || iCol == 9)))
	{
		cellDiv.style.backgroundImage = "url('images/3xletter.png')";
		cellDiv.style.backgroundRepeat = "no-repeat";
		cellDiv.style.backgroundPosition = "50% 50%";
		cellDiv.style.backgroundSize = "cover";
	}
	else if ((iRow == 0 && (iCol == 3 || iCol == 11)) ||
		(iRow == 2 && (iCol == 6 || iCol == 8)) ||
		(iRow == 3 && (iCol == 0 || iCol == 7 || iCol == 14)) ||
		(iRow == 6 && (iCol == 2 || iCol == 6 || iCol == 8 || iCol == 12)) ||
		(iRow == 7 && (iCol == 3 || iCol == 11)) ||
		(iRow == 8 && (iCol == 2 || iCol == 6 || iCol == 8 || iCol == 12)) ||
		(iRow == 11 && (iCol == 0 || iCol == 7 || iCol == 14)) ||
		(iRow == 12 && (iCol == 6 || iCol == 8)) ||
		(iRow == 14 && (iCol == 3 || iCol == 11)))
	{
		cellDiv.style.backgroundImage = "url('images/2xletter.png')";
		cellDiv.style.backgroundRepeat = "no-repeat";
		cellDiv.style.backgroundPosition = "50% 50%";
		cellDiv.style.backgroundSize = "cover";
	}
	else if (iRow == 7 && iCol == 7)
	{
		cellDiv.style.backgroundImage = "url('images/center.png')";
		cellDiv.style.backgroundRepeat = "no-repeat";
		cellDiv.style.backgroundPosition = "50% 50%";
		cellDiv.style.backgroundSize = "cover";
	}
	//cellDiv.style.backgroundImage = "url('https://place-hold.it/20x20/0000ff/ffffff&text=$&fontsize=10')";
}

function styleCellBasedOnContents(cellDiv)
{
	//The following line implies that ALL style must be re-applied in both "if" and "else"...
	cellDiv.removeAttribute('style');

	//What defines an "empty cell"? Right now, its the length of innerHTML. Soon that will be inadequate...
	if(cellDiv.innerHTML.length <= 0)
	{
		//Change the "looks"...
		cellDiv.style.backgroundColor = "#DAD4EF";
		cellDiv.style.border = "2px solid #114B5F";
		cellDiv.style.paddingTop = "0px";

		//Add background image if it is one of the "special-score" cells...
		setBackgroundImageIfEmpty(cellDiv);

		//Change the drag/drop-ability...
		cellDiv.setAttribute("draggable", "false");
		cellDiv.setAttribute("ondrop", "drop_handler(event);");
		cellDiv.setAttribute("ondragover", "dragover_handler(event);");
		cellDiv.setAttribute("ondragstart", "");
		cellDiv.setAttribute("ondragenter", "");
		cellDiv.setAttribute("ondragleave", "");
		cellDiv.setAttribute("ondragend", "");
	}
	else
	{
		//Change the "looks"...
		cellDiv.style.backgroundColor = "#333333";
		cellDiv.style.border = "1px solid #028090";
		cellDiv.style.paddingTop = "5px";

		//Change the drag/drop-ability...
		cellDiv.setAttribute("draggable", "true");
		cellDiv.setAttribute("ondrop", "");
		cellDiv.setAttribute("ondragover", "");
		cellDiv.setAttribute("ondragstart", "dragstart_handler(event);");
		cellDiv.setAttribute("ondragenter", "dragenter_handler(event);");
		cellDiv.setAttribute("ondragleave", "dragleave_handler(event);");
		cellDiv.setAttribute("ondragend", "dragend_handler(event);");
	}
}
