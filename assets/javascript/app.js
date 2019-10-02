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
                <button  class="btn btn-search" data-name="${buttonName}">${buttonName}</button>
                <button data-name="${buttonName}" class="btn btn-delete fas fa-hand-middle-finger"></button>
            </div>
        `;
        $(".recent-search").append(button);
    }

    localStorage.setItem("buttons", JSON.stringify(buttons));

}

loadButtons();

renderButtons();

// draws button balue from search input then renders buttons
$("#submit-button").on("click", function(event){
    event.preventDefault();
    const value = $("#search").val();
    buttons.push(value);
    renderButtons();

    console.log("value: ",value);
});

