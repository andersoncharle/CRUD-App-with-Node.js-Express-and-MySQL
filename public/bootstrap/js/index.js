

var submit=document.querySelector("#submit");
var inputtxt=document.querySelector(".phone");
submit.addEventListener("click",(event)=>{


console.log("yes submiteed!");

var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.value.match(phoneno))
     {
	   return true;
	 }
   else
     {
	  //  alert("Not a valid Phone Number");   
       window.location.href="add.php";
	   return false;
     }






event.preventDefault();

})


