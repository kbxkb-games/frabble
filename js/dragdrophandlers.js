//Drag and drop event handlers...
const dragstart_handler = ev => {
    console.log("drag start")
    ev.dataTransfer.setData("text/plain", ev.target.id)
    //ev.dataTransfer.effectAllowed = "move";
    //ev.dataTransfer.dropEffect = "move";
}

const dragenter_handler = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    //ev.dataTransfer.dropEffect = "move";
    console.log("dragenter");
    return false;
}

const dragleave_handler = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("dragleave");
    return false;
}

const dragover_handler = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    //ev.dataTransfer.dropEffect = "move";
    console.log("dragOver");
    return false;
}

const drop_handler = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("drop");
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    let draggedCell = document.getElementById(data);
    ev.target.innerHTML = draggedCell.innerHTML;
    draggedCell.innerHTML = "";
    // Change the appearance and draggability/droppability of the 2 cells that just interchanged contents!
    styleCellBasedOnContents(draggedCell);
    styleCellBasedOnContents(ev.target);
}

const dragend_handler = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("dragEnd");
    // Remove all of the drag data
    ev.dataTransfer.clearData();
}
