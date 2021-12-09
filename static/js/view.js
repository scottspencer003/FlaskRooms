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
        });
    })


////This section is for the modal that handles the add patient form
//
//    // Get the modal
//    var modal = document.getElementById("myModal");
//
//    // Get the button that opens the modal
//    var btn = document.getElementsByClassName("openBtn");
//
//    // Get the <span> element that closes the modal
//    var span = document.getElementsByClassName("close")[0];
//
//    // When the user clicks on <span> (x), close the modal
//    span.onclick = function() {
//      modal.style.display = "none";
//    }
//
//
//    var showModal = function() {
//        modal.style.display = "block";
//    };
//
//    function passRoom(roomValue) {
//        var updateButton = document.getElementById("update");
//        updateButton.value = roomValue
//
//    }
//
//    for (var i = 0; i < btn.length; i++) {
//        btn[i].addEventListener('click', showModal, false);
//    }


    $(document).ready(function(){

        //Comment open and close modal
        $('.comBtn').click(function(){
            var roomid = $(this).data('id');
            $.ajax({
                url: '/getComment/',
                type: 'post',
                data: {roomid: roomid},
                success: function(data){
                    $('#modal-body').text(data).show();
                    $('#comModal').modal('show');
                }
            });
        });

        $('.closeComment').click(function() {
            $('#comModal').modal('hide');
        });

    });

    $(document).ready(function(){

        //Comment open and close modal
        $('.patientBtn').click(function(){
            var roomid = $(this).data('id');
            $.ajax({
                url: '/getPatient/',
                type: 'post',
                data: {roomid: roomid},
                success: function(data){
                    $('#inputName').val(data['patient_name']);
                    $('#date').val(data['admission_date']);
                    $('#inputLOC').val(data['loc']);
                    $('#inputInsurance').val(data['patient_insurance']);
                    $('#inputVisitors').val(data['visitors']);
                    $('#inputComment').val(data['comment']);
                    $('#update').val(data['room']);
                    $('#patientModal').modal('show');
                }
            });
        });

        $('.closePatientModal').click(function() {
            $('#patientModal').modal('hide');
        });

    });





//Function for the navigation bar
    function myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
