//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");

    var checkBox = document.createElement("input");

    var label = document.createElement("label");

    var editInput = document.createElement("input");

    var editButton = document.createElement("button");

    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    listItem.className = "task-item";

    label.innerText = taskString;
    label.className="task task-label";

    checkBox.type="checkbox";
    checkBox.className = "task-checkbox"
    editInput.type = "text";
    editInput.className = "task task-input";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit";

    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "delete-img";
    deleteButton.appendChild(deleteButtonImg);


    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function() {
    console.log("Add Task...");

    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}


var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".task-input");
    var label = listItem.querySelector(".task-label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("edit-mode");

    if(containsClass){
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
};


var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);

}


var taskCompleted = function() {
    console.log("Complete Task...");

    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//TODO: the glue to hold it all together.

addButton.onclick = addTask;
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    console.log("bind list item events");

    var checkBox = taskListItem.querySelector(".task-checkbox");
    var editButton = taskListItem.querySelector(".edit");
    var deleteButton = taskListItem.querySelector(".delete");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (var i = 0; i < completedTasksHolder.children.length; i++) {

    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




//Problem: Issues with usability don't get seen until they are in front of a human tester.

//TODO: prevent creation of empty tasks.

//TODO: change edit to save when you are in edit mode.