from flask import Flask, render_template, request, redirect
import json
import os

app = Flask(__name__)


@app.route('/test', methods=['POST', 'GET'])
def test():
    jsonFile = "tests.json"
    if os.path.exists(jsonFile):
        data = ""
        try:
            with open(jsonFile) as f:
                data = json.load(f)
            f.close()
        except:
            file_data = "could not read file"
        return render_template('tests.html', data=data)
    # else:
    #     data = {"tests":[{"id":"1","ip_addy":"IP1","name":"name1"}]}
    #
    #     with open(jsonFile, "w+") as f:
    #         json.dump(data, f)
    #     f.close()
    #     return render_template('tests.html', title=title, data=data)


@app.route('/clear/', methods=['POST', 'GET'])
def clear():
    if request.method == "POST":
        room_num = request.form.get('clear')
        jsonFile = "tests.json"
        if os.path.exists(jsonFile):
            data = ""
            try:
                with open(jsonFile) as f:
                    data = json.load(f)
                f.close()
            except:
                file_data = "could not read file"

        for room in data['rooms']:
            if room['room'] == int(room_num):
                room['patient_name'] = ""
                room['occupied'] = False
                room['patient_insurance'] = ""
                room['visitors'] = ""
                room['admission_date'] = ""
                room['admission_date'] = ""
                room['loc'] = ""

        with open(jsonFile, "w+") as f:
            json.dump(data, f, indent=2)
        f.close()
    return redirect(request.referrer)



app.run(use_reloader = True, debug = True)
