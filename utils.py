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
