"""
Flask room registration web application
Scott Spencer
This application runs in a browser and allows patients to be assigned to a room. Some fields are specific to
my current company.
To run the app make sure to open the directory in a terminal window and then run "export FLASK-APP=main"
Then run "flask run"
Next open your local host in the Safari browser with a '/' to view the apps main page.
The main page will show a list of the current rooms and patient info. The person icon/button opens a form
for that room where the patient can be changed. Pressing the exit icon/button will remove the patient for that
room and set the room to vacant status
"""

#import modules
from flask import Flask, render_template, request, redirect, url_for
import json
import os
import utils

app = Flask(__name__)

#main page route that displays the rooms/patients
@app.route('/', methods=['POST', 'GET'])
def display():

    rooms_data = utils.read_file_data("rooms.json")
    wait_list_data = utils.read_file_data("waitListGIP.json")
    wait_list_respite = utils.read_file_data("waitListRespite.json")

    return render_template('view.html', data=rooms_data, waitData=wait_list_data, respData=wait_list_respite)




#route set to the exit button that will clear the patient data for that room and change the status to vacant
@app.route('/clear/', methods=['POST', 'GET'])
def clear():
    if request.method == "POST":
        room_num = request.form.get('clear')
        utils.clear_room(room_num)

    return redirect(request.referrer)

@app.route('/clearGIPSlot/', methods=['POST', 'GET'])
def clearSlot():
    if request.method == "POST":
        slot_num = request.form.get('clearGIPSlot')
        jsonFile = "waitListGIP.json"
        utils.clear_wait_slot(jsonFile, slot_num)
        return redirect(request.referrer)



#route that controls the patient update button. Takes the current room number and redirects to the patient form
@app.route('/updatePatient/', methods=['POST', 'GET'])
def update():
    if request.method == "POST":
        room = request.form.get('update')
        return render_template('patientUpdate.html', room=room)

#route that updates the json data file with the patient info from the form
@app.route("/addPatient/", methods=["GET", "POST"])
def addPatient():
    if request.method == "POST":
        room_num = request.form.get('update')
        jsonFile = "rooms.json"
        data = utils.read_file_data(jsonFile)

        for room in data['rooms']:
            if room['room'] == int(room_num):
                room['patient_name'] = request.form.get("inputName")
                room['occupied'] = True
                room['patient_insurance'] = request.form.get("inputInsurance")
                room['visitors'] = request.form.get("inputVisitors")
                room['admission_date'] = request.form.get("date")
                room['loc'] = request.form.get("inputLOC")
                room['comment'] = request.form.get("inputComment")

        with open(jsonFile, "w+") as f:
            json.dump(data, f, indent=2)
        f.close()

    return redirect(url_for('display'))


# @app.route("/movePatient/", methods=["GET", "POST"])
# def movePatient():
#     if request.method == "POST":
#         room_num = request.form.get('moveToRoom')
#         patientInfo = request.form.get('patient')
#
#     return redirect(url_for('display'))

app.run(use_reloader=True, debug=True)
