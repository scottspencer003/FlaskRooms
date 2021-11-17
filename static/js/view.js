//Functions to get and display the current date and time
    var dt = new Date().toLocaleString();
    document.getElementById('date-time').innerHTML=dt;

    $(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
    })


//This section is for the modal that handles the add patient form

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementsByClassName("openBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }


    var showModal = function() {
        modal.style.display = "block";
    };

    function passRoom(roomValue) {
        var updateButton = document.getElementById("update");
        updateButton.value = roomValue

    }

    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', showModal, false);
    }



//Comment Modal
    // Get the modal
    var commentModal = document.getElementById("comModal");

    // Get the button that opens the modal
    var btn2 = document.getElementsByClassName("openCom");

    // Get the <span> element that closes the modal
    var comSpan = document.getElementsByClassName("closeComment")[0];

    // When the user clicks on <span> (x), close the modal
    comSpan.onclick = function() {
      commentModal.style.display = "none";
    }

    var showComModal = function() {
        commentModal.style.display = "block";
    };

    for (var i = 0; i < btn.length; i++) {
        btn2[i].addEventListener('click', showComModal, false);
    }


//Function for the navigation bar
    function myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }


//Ajax request for comment
$('input').on('onClick', function(event) {

		$.ajax({
			data : {
				room : $('#comBtn').val()
			},
			type : 'POST',
			url : '/getComment'
		})
		.done(function(data) {

			$('#displayComment').text(data).show();


		});

		event.preventDefault();

	});