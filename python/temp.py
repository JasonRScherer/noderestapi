#!/usr/bin/env python3
#  Basic script to grab data from DS18B20 sensor
#  Can be changed to output temp in celsius or fahrenheit by
#  changing the output of read_temp() to temp_c or temp_f

import os, glob, time, json, requests, datetime


base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
ts = time.time()
isodate = datetime.datetime.now()
url = 'http://172.16.7.200:3000/temps/temperatures'


def read_temp_raw():
    """
    Returns raw temperature from sensor

    read_temp_raw() opens up the w1_slave and reads the output lines
    """
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp():
    """
    Returns the temp in F, change output to temp_c for C instead

    read_temp() reads the output from reat_temp_raw and converts
    the output to celsius or fahrenheit
    """
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string)/1000.0
        temp_f = temp_c * 9.0/5.0 + 32.0
        return temp_f


while True:
    print(read_temp())
    temp = {
        'temp_l' : read_temp(),
        'date' : datetime.datetime.now().isoformat()
	}
    headers = {'content-type' : 'application/json'}
    r = requests.post(url, data=json.dumps(temp), headers=headers)
    r.text

    time.sleep(1)
