import json

def read_file_data(json_file):
    """
    return a dictionary of the provided JSON data

    :param json_file: the full path of the JSON file to read data from.
    :return: return a DICT of JSON in the file.

    If file not found, raise exception
    """
    data = None
    try:
        with open(json_file) as f:
            data = json.load(f)
        f.close()
    except Exception as e:
        raise ValueError(f"There was a problem reading: {json_file} The error: {e}")

    return data


def clear_wait_slot(json_file, slot_num):
    """
    Clears the data from a slot in the waitlist

    :param json_file: full path of the waitlist json file
    :param slot_num: the slot number that needs to be cleared
    :return:
    """
    data = read_file_data(json_file)
    for slot in data['waitList']:
        if slot['slot'] == int(slot_num):
            slot['occupied'] = False
            slot['patient_name'] = ""
            slot['patient_insurance'] = ""
            slot['loc'] = ""
            slot['currentLocation'] = ""
            slot['visitors'] = ""
            slot['waitListAddedDate'] = ""
            slot['approvedBy'] = ""
            slot['contact'] = ""
            slot['comments'] = ""

            with open(json_file, "w+") as f:
                json.dump(data, f, indent=2)
            f.close()


def move_wait_room(json_file, slot_num, room_num):
    """
    Moves the patient from wait into specified room and then clears the wait list slot

    :param json_file: full path of the waitlist json file
    :param slot_num: the slot number that needs to be cleared
    :return:
    """
    wait_data = read_file_data(json_file)
    for slot in wait_data['waitList']:
        if slot['slot'] == int(slot_num):
            slot['occupied'] = False
            slot['patient_name'] = ""
            slot['patient_insurance'] = ""
            slot['loc'] = ""
            slot['currentLocation'] = ""
            slot['visitors'] = ""
            slot['waitListAddedDate'] = ""
            slot['approvedBy'] = ""
            slot['contact'] = ""
            slot['comments'] = ""

            with open(json_file, "w+") as f:
                json.dump(data, f, indent=2)
            f.close()

def close_room(room_num, comment):
    """
    Clears patient data for the room and sets the status to closed

    :param json_file: open
    :param room_num:
    :param comment: comment string for the reason the room is closed
    :return:
    """
    json_file = "rooms.json"
    data = read_file_data(json_file)
    for room in data['rooms']:
        if room['room'] == int(room_num):
            room['patient_name'] = "---"
            room['occupied'] = "closed"
            room['patient_insurance'] = "---"
            room['visitors'] = "---"
            room['admission_date'] = "---"
            room['loc'] = "---"
            room['comment'] = comment

    with open(json_file, "w+") as f:
        json.dump(data, f, indent=2)
    f.close()



def clear_room(room_num):
    """
    Clears the patient information from the room and sets its occupancy to vacant
    :param room_num: gets the number of the room to clear
    :return:
    """
    json_file = "rooms.json"
    data = read_file_data(json_file)

    for room in data['rooms']:
        if room['room'] == int(room_num):
            room['patient_name'] = ""
            room['occupied'] = False
            room['patient_insurance'] = ""
            room['visitors'] = ""
            room['admission_date'] = ""
            room['admission_date'] = ""
            room['loc'] = ""
            room['comment'] = ""

    with open(json_file, "w+") as f:
        json.dump(data, f, indent=2)
    f.close()

# def move_room(current_room, new_room):
#     """
#     Writes the patient to the room if it is vacant then returns a success message. If the room is not vacant then it returns an error asking that they clear the current patient first
#     :param current_room: current room number for the patient
#     :param new_room: room that they are being moved to
#     :return:
#     """
#     json_file = "rooms.json"
#     data = read_file_data(json_file)
#
#     for room in data['rooms']:
#         if room['room'] == int(new_room):
#             if room['occupied'] == False:
#
#
#
#
#     with open(json_file, "w+") as f:
#         json.dump(data, f, indent=2)
#     f.close()