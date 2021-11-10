import json

def read_file_data(json_file):
    """
    reutrn a dictionary of the provided JSON data

    :param file_name: the full path of the JSON file to read data from.
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