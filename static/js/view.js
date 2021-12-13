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
        //Close the comment modal
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
        //Close patient modal form
        $('.close').click(function() {
            $('#patientModal').modal('hide');
        });

    });

    $(document).ready(function(){

        //Clear patient open and close modal
        $('.clearPatientBtn').click(function(){
            var roomid = $(this).data('id');
            $('.clearYes').attr('data-id', roomid);
            $('#clearPatientModal').modal('show');
        });
        //Closes modal in cancel is selected
        $('.clearNo').click(function() {
            $('#clearPatientModal').modal('hide');
        });


        //Clear patient data from room if clear button selected
        $('.clearYes').click(function(){
            var roomid = $(this).attr('data-id');
            $.ajax({
                url: '/clear/',
                type: 'post',
                data: {roomid: roomid},
                success: function(){
                    $('#clearPatientModal').modal('hide');
                    location.reload();
                }
            });
        });


        //Clear patient open and close modal
        $('.openRoomBtn').click(function(){
            var roomid = $(this).data('id');
            $('.openYes').attr('data-id', roomid);
            $('#openRoomModal').modal('show');
        });
        //Closes modal in cancel is selected
        $('.openNo').click(function() {
            $('#openRoomModal').modal('hide');
        });


        //Clear patient data from room if clear button selected
        $('.openYes').click(function(){
            var roomid = $(this).attr('data-id');
            $.ajax({
                url: '/clear/',
                type: 'post',
                data: {roomid: roomid},
                success: function(){
                    $('#openRoomModal').modal('hide');
                    location.reload();
                }
            });
        });

    });


    $(document).ready(function(){
        //Close room open and close modal
        $('.closeRoomBtn').click(function(){
            var roomid = $(this).data('id');
            $('.closeYes').attr('data-id', roomid);
            $('#closeRoomModal').modal('show');
        });
        //Closes modal in cancel is selected
        $('.closeNo').click(function() {
            $('#closeRoomModal').modal('hide');
        });


        //Close room
        $('.closeYes').click(function(){
            var roomid = $(this).attr('data-id');
            var comment = $('#roomCloseComment').val();
            $.ajax({
                url: '/closeRoom/',
                type: 'post',
                data: {roomid: roomid, comment: comment},
                success: function(){
                    $('#closeRoomModal').modal('hide');
                    location.reload();
                }
            });
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
