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
//    $(document).ready(function(){
//      var date_input=$('input[name="date"]'); //our date input has the name "date"
//      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
//      var options={
//        format: 'mm/dd/yyyy',
//        container: container,
//        todayHighlight: true,
//        autoclose: true,
//      };
//      date_input.datepicker(options);
//    })


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

        $('.clearNo').click(function() {
            $('#clearPatientModal').modal('hide');
        });

    });

    $(document).ready(function(){

        //Clear patient
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
