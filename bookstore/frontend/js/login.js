$(document).ready(function() {
    getLoginCredentials();
});

function getLoginCredentials(){
    $("#login").click(function(event){
        event.preventDefault();
        var username = $("#floatingUsername").val();
        var password = $("#floatingPassword").val();
        $("#floatingUsername").val('');
        $("#floatingPassword").val('');
        var url = "http://localhost:5555/login/";
        var data = {"username": username, "password": password};
        $.post({url: url, data: data, success: function(data){
            if(data.result == true){
                localStorage.setItem('credentialCheck', 'true');
                location.href="home.html";
            }else{
                localStorage.setItem('credentialCheck', 'false');
                alert("Login Failed!!!!!");
            }
          }});
    });
}