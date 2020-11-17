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

function getArrayIndexFromCartesianZeroBasedId(czbId)
{
        let rowcol = czbId.split("-");
        let iRow = parseInt(rowcol[0]);
        let iCol = parseInt(rowcol[1]);
        return (iRow * numCellsSquare) + iCol;

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
	let score = getScoreFromLetter(letter);
	let retHTML = "<span class=\"primaryletter\">" + letter + "</span>";
	if (score <= 0)
		return retHTML;
	//else if (score > 0 && score < 10)
	//	return retHTML + "<span class=\"secondaryscore\"><sub>&nbsp;" + score + "</sub></span>";
	else
		return retHTML + "<span class=\"secondaryscore\"><sub>&nbsp;" + score + "</sub></span>";
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

function setDraggableDroppable(items) {
	items.forEach(item => {
		if(item.innerHTML.length <= 0) {
			item.setAttribute("class", "empty");
			item.setAttribute("draggable", "false");
			item.setAttribute("ondrop", "drop_handler(event);");
			item.setAttribute("ondragover", "dragover_handler(event);");
			item.setAttribute("ondragstart", "");
			item.setAttribute("ondragenter", "");
			item.setAttribute("ondragleave", "");
			item.setAttribute("ondragend", "");
		} else {
			item.classList.remove("empty");
			item.setAttribute("draggable", "true");
			item.setAttribute("ondrop", "");
			item.setAttribute("ondragover", "");
			item.setAttribute("ondragstart", "dragstart_handler(event);");
			item.setAttribute("ondragenter", "dragenter_handler(event);");
			item.setAttribute("ondragleave", "dragleave_handler(event);");
			item.setAttribute("ondragend", "dragend_handler(event);");
		}
	})
}
