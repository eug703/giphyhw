let buttons = ["dogs", "bears", "tigers", "tapirs"];
const apiKey = "7435ZttG4GupgYRAIB1MBzDFUlioz6o6";
const endPoint = "http://api.giphy.com/v1/gifs/search?api_key=7435ZttG4GupgYRAIB1MBzDFUlioz6o6"



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
    // splice takes out the value of the index position
    buttons.splice(buttonIndex, 1);
    renderButtons();
}


function addButton(value){
    buttons.push(value);
    renderButtons();
}

function createGifTemplate(gif){
    const images = gif.images;
    const template = `
    <div class="giphy">
        <div class="giphy-image">
             <img src="${images.original_still.url}" 
             data-still="${images.original_still.url}" 
             data-animate="${images.original.preventDefault}"
             data-state="still">
            <i class="fa fa-play img-play"></i>
         </div>
        
        <div class="giphy-info">
            <p>Rating: g</p>
        </div>

        <div class="giphy-footer" data-link="${gif.embed_url}"> 
        </div>
   
    </div>
        `;

    return template;

}

function renderGifs(gifs) {
    $(".giphy-content").empty();

    for(let i=0; i<gifs.length; i++){
        const gif = gifs[i];
        
        const gifTemplate = createGifTemplate(gif)

        $('.giphy-content').append(gifTemplate)
        // gif.id
    }

}

function fetchGiphy(value){
    const url = endPoint + '&q=' + value;

    $.ajax({url: url})
        .then(function(response){
            // response.data
            const gifs=response.data;
            renderGifs(gifs);
            console.log('Gifs: ', gifs);

        })
        .catch(function(error){
            console.log('Error: ', error);
        })
}


function searchGiphy(event){
    event.preventDefault();
    const value = $("#search").val();
    addButton(value);
    fetchGiphy(value);


}

// Event listeners section
// delete gif on button click
$(document).on('click', '.btn-delete', removeButton);
// draws button Value from search input then renders buttons on click
$("#submit-button").on("click", searchGiphy);

