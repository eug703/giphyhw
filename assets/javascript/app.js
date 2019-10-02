let buttons = ["dogs", "bears", "tigers", "tapirs"];

// calls stored searches from local storage
function loadButtons(){
    const listButtons = JSON.parse(localStorage.getItem("buttons"));
    buttons = listButtons;
}

// renders initial buttons from default array
function renderButtons(){
    // clears the array of button values before click so it does not copy the whole array again
    $(".recent-search").empty();

    for(let i=0; i<buttons.length; i++){
        const buttonName=buttons[i];
        const button = `
            <div class="wrap-buttons">
                <button  
                    class="btn btn-search" 
                    data-name="${buttonName}"
                    >${buttonName}</button>

                <button 
                    data-name="${buttonName}" 
                    data-index="${i}"
                    class="btn btn-delete fas fa-hand-middle-finger"
                    ></button>
            </div>
        `;
        $(".recent-search").append(button);
    }
    localStorage.setItem("buttons", JSON.stringify(buttons));
}


loadButtons();

renderButtons();

// function called when delete buton click is heard
function removeButton() {
    const buttonIndex= $(this).attr('data-index');
    buttons.splice(buttonIndex, 1);
    renderButtons();
}


function addButton(value){
    buttons.push(value);
    renderButtons();
}

function searchGiphy(){
    event.preventDefault();
    const value = $("#search").val();
    addButton(value);
    console.log("value: ",value);
}

// Event listeners section
// delete gif on button click
$(document).on('click', '.btn-delete', removeButton);
// draws button Value from search input then renders buttons on click
$("#submit-button").on("click", searchGiphy);

