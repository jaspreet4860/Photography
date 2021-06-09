$(document).ready(function() {
    var credential = localStorage.getItem('credentialCheck');
    if (credential == 'false' || credential == null){
        location.href="login.html";
    }
    logout();
    getAllBooks();
});

function logout(){
    $("#logout").click(function(){
        localStorage.setItem('credentialCheck', 'false');
        location.href="index.html";
    });
}

function getAllBooks(){
    var url = "http://localhost:5555/getAllBooks/";
    
    $.ajax({url: url, success: function(data){
        var result = data["booksInfoJSON"];
        $("#books").empty();
        $("#showAllBooksInUpdateBook").empty();
        $("#showAllBooksInDeleteBook").empty();
        for (var i=0; i < result.length; i++){
            if (data["result"] !== null){
                $("#books").append(
                    '<div class="col-md-3">' +
                        '<div class="card" style="min-height: 30rem;">' +
                            '<div style="height:20rem">' +
                                '<img src="http://localhost:5555/'+ result[i]["imageName"] +'" class="card-img-top img-fluid" style="height:100%" alt="...">'+
                            '</div>' +
                            '<div class="card-body">' +
                                '<h5 class="card-title">'+ result[i]["bookName"] +'</h5>' +
                                '<a href="'+ result[i]["amazonUrl"] +'" target="_blank">Go to Amazon</a>'+
                            '</div>'+
                        '</div>' +
                    '</div>');
                
                $("#showAllBooksInUpdateBook").append(
                    '<tr>' +
                        '<th scope="row">' +  parseInt(i + 1) + '</th>' +
                            '<td>' + result[i]["bookName"]  +'</td>' +
                            '<td class="text-wrap" style="width: 15px;"><a href="' + result[i]["amazonUrl"] + '" target="_blank">' + result[i]["amazonUrl"]  +'</a></td>' +
                            '<td><div style="width:15em;"><img src="http://localhost:5555/' + result[i]["imageName"] + '" style="width:100%;" class="img-responsive"></div></td>' +
                            '<td><button id="' + result[i]["id"]  +'" type="button" class="btn btn-primary" onClick="showTableBasedOnId(\''+ result[i]["id"] +'\')">Update Book</button></td>' +
                    '</tr>');
                
                $("#showAllBooksInDeleteBook").append(
                    '<tr>' +
                        '<th scope="row">' +  parseInt(i + 1) + '</th>' +
                            '<td>' + result[i]["bookName"]  +'</td>' +
                            '<td class="text-wrap" style="width: 15px;"><a href="' + result[i]["amazonUrl"] + '" target="_blank">' + result[i]["amazonUrl"]  +'</a></td>' +
                            '<td><div style="width:15em;"><img src="http://localhost:5555/' + result[i]["imageName"] + '" style="width:100%;" class="img-responsive"></div></td>' +
                            '<td><button id="' + result[i]["id"]  +'" type="button" class="btn btn-primary" onClick="deleteBook(\''+ result[i]["id"] +'\')">Delete Book</button></td>' +
                    '</tr>');
            }
          }      
      }});
}