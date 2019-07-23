////////functions for modal////////////////////

const show = () => {
    $('#modal').show;
}
const close = () =>{
    $('#modal').css('display', 'none');
}

$('#modalExit').on('click', close);

setTimeout(() => {
    $('#modal').show();
}, 200);


// main function for the ajax call
const apiCall = (name) => {
    $.ajax({
        // api webaddress
        url: 'https://rickandmortyapi.com/api/character/',
        type: "GET"
    })
    .then(
        (data)=>{
            $('span').remove();
            // logs the data that is returned from the query for manual sifting
            console.log(data);
            
            // variables used to hold the html elements
            const $name = $('#name');
            const $status = $('#status');
            const $species = $('#species');
            const $gender = $('#gender');
            const $origin = $('#origin');
            const $location = $('#location');

        // loops through the array of objects
        for (var i =0; i < data.results.length; i++){

            //using toLowerCase() to sanitize user input// checks to see if the name is present in the array of objects
            if (data.results[i].name.toLowerCase() == name.toLowerCase()){
                /////////appending the name/////
                $name.append($('<span>').text(data.results[i].name));            
            
                //////logic to change text color if character is dead///
                if (data.results[i].status == 'Dead'){
                ///////appending status//////

                    // old styling for if they are dead [red letters only]
                    // $status.append($('<span>').text(data.results[i].status).css('color', 'red').css('font-weight', '800').css('text-transform', 'uppercase'));

                    $status.append($('<span>').text(data.results[i].status).css('color', 'white').css('background-color', 'red').css('font-weight', '800').css('text-transform', 'uppercase').css('border-radius', '8px').css('padding-right', '4px').css('padding-left', '4px'));
                }
                else{
                    $status.append($('<span>').text(data.results[i].status));
                }

                ///////appending species/////
                $species.append($('<span>').text(data.results[i].species));

                ///////appending gender//////
                $gender.append($('<span>').text(data.results[i].gender));

                ///////appending origin//////
                $origin.append($('<span>').text(data.results[i].origin.name));

                ///////appending location/////
                $location.append($('<span>').text(data.results[i].location.name));

                // path of image for current character
                const imgPath = String(data.results[i].image);

                // adds the current img path
                $('#characterImage').attr('src', `${imgPath}`);
                
                // adds the current img path to the mobile friendly div

                $('#mediaCharacterImage').attr('src', `${imgPath}`);
                
            }
            // what to do if name isn't present
            else if (data.results[i].name.toLowerCase() != name.toLowerCase()){
                console.log("not found");
                
            }
            
        } 
        }
    ), 
    // logs any errors related to the api call
    (error) => {
        console.log(error);
        
    };
};

// event listener/handler for submit button
$('#submitButton').on('click', ()=>{
    $('p').remove();

    // grabs user input for custom query
    let $customInput = $('input[type="text"]').val();

    // Sanitized user input to desired format
    $customInput=$customInput.toLowerCase().split(' ').map((string)=> string.charAt(0).toUpperCase() + string.substring(1)).join(' ');
    
    // calling the main function and passing user input
    apiCall($customInput);
    return false;
})

// event listener/handler for reset button
$('#resetButton').on('click', ()=>{
    $('span').remove();
    $('img').attr('src', '');
});

// event listeners/handlers for each hard coded query button [rick, morty, summer, jerry, beth]
$('#rick').on('click',($name)=>{
    apiCall("Rick Sanchez");
    return false;
});

$('#morty').on('click',($name)=>{
    apiCall("Morty Smith");
    return false;
});

$('#summer').on('click',($name)=>{
    apiCall("Summer Smith");
    return false;
});

$('#jerry').on('click',($name)=>{
    apiCall("Jerry Smith");
    return false;
});

$('#beth').on('click',($name)=>{
    apiCall("Beth Smith");
    return false;
});




