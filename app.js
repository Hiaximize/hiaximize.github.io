const apiCall = (name) => {
    $.ajax({
        url: 'https://rickandmortyapi.com/api/character/',
        type: "GET"
    })
    .then(
        (data)=>{
        
            console.log(data);
            
            // const $name = $('#name').append($('<p>').text(data[0].name));
        for (var i =0; i < data.results.length; i++){
            // console.log(data.results[i].name);
            if (data.results[i].name == name){
                
                console.log("found "+name);
            }
            else if (data.results[i].name != name){
                console.log("not it");
                
            }
            
        } 
        }
    ), 
    (error) => {
        console.log(error);
        
    };
};

$('#resetButton').on('click', ()=>{location.reload();});

$('#rick').on('click',($name)=>{
    apiCall("Rick Sanchez");
});




