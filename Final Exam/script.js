   function getdata(){
     var firstname = document.getElementById("fname").value;  // jaspreet
     var lastname  = document.getElementById("lname").value;  // kaur
     var age  = document.getElementById("age").value;  // 20
     document.getElementById("displaydata").innerHTML ="firstname: " + "<br> lastname: " + lastname;
   }
   <script>
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myviewlist").classList.toggle("show");
}

// Close the viewlist if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.viewbtn')) {
    var viewlist = document.getElementsByClassName("viewlist-content");
    var i;
    for (i = 0; i < viewlist.length; i++) {
      var openviewlist = viewlist[i];
      if (openviewlist.classList.contains('show')) {
        openviewlist.classList.remove('show');
      }
    }
  }
}
</script>
