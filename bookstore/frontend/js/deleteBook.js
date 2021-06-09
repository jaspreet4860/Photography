$( document ).ready(function() {
    var credential = localStorage.getItem('credentialCheck');
    if (credential == 'false' || credential == null){
        location.href="login.html";
    }
    getAllBooks();
});

function deleteBook(id){
    console.log("ID :>", id)
    var url = "http://localhost:5555/deleteBook/" + id;
    $.ajax({url: url, success: function(data){
        var result = data["result"];
        console.log("result :>", result)
        if(result == true){
            location.href="deleteBook.html";
        }else{
            alert("Deletion Unsuccessful!");
        }
    }});
}