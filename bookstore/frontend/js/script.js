$( document ).ready(function() {
    var credential = localStorage.getItem('credentialCheck');
    if (credential == 'false' || credential == null){
        location.href="login.html";
    }
    getBookName();
    getAllBooks();
});

function getBookName(){
    $("#bookSearch").keyup(function(){
        var bookToSearch = $("#bookSearch").val();
        var url = "http://localhost:5555/getBookInfo/" + bookToSearch;
        $("#books").empty();
        $.ajax({url: url, success: function(data){
            console.log("data :>", data["result"])
            if (data["result"] !== null){
                console.log(data["result"]["imageName"])
                $("#books").append(
                    '<div class="col-md-3">' +
                        '<div class="card">' +
                            '<img src="http://localhost:5555/'+ data["result"]["imageName"] +'" class="card-img-top" alt="...">'+
                            '<div class="card-body">' +
                                '<h5 class="card-title">'+ data["result"]["bookName"] +'</h5>' +
                                '<a href="'+ data["result"]["amazonUrl"] +'" target="_blank">Go to Amazon</a>'+
                            '</div>'+
                        '</div>' +
                    '</div> ');
            }
            
          }});
    });
}

function getAllBooks(){
    var url = "http://localhost:5555/getAllBooks/";
    $.ajax({url: url, success: function(data){
        var result = data["booksInfoJSON"];
        for (var i=0; i < result.length; i++){
            if (data["result"] !== null){
                $("#books").append(
                    '<div class="col-md-3">' +
                        '<div class="card">' +
                            '<img src="http://localhost:5555/'+ result[i]["imageName"] +'" class="card-img-top" alt="...">'+
                            '<div class="card-body">' +
                                '<h5 class="card-title">'+ result[i]["bookName"] +'</h5>' +
                                '<a href="'+ result[i]["amazonUrl"] +'" target="_blank">Go to Amazon</a>'+
                            '</div>'+
                        '</div>' +
                    '</div>');
            }
          }      
      }});
}
