##
# DoorWatcher

# This script waits for GPIO input representing the state of a door and
# reports that state to a webtask API. It is intended to run on a Raspberry Pi
# with a GPIO header. A switch is wired to the GPIO header; for this example,
# we are using the software pullup resistor and connecting the switch to pins
# 18 for signal and 20 for ground.

import signal
import sys
import requests
try:
    import RPi.GPIO as GPIO
except RunTimeError:
    print("Error importing RPi.GPIO, try running as superuser.")

# Webtask URI
webtask="https://wt-88dcbaaff6b332f0b3441aa284271dd6-0.run.webtask.io/Doormon?&action=setState&state=open&id=1"

# Set GPIO numbering system
GPIO.setmode(GPIO.BOARD)

channel=18 # Use Pin 18 on the GPIO header
GPIO.setup(channel, GPIO.IN, pull_up_down=GPIO.PUD_UP) # Use pull-up resistor

def signal_handler(signal, frame):
    print(" Cleaning up and exiting.")
    GPIO.cleanup()
    sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)

GPIO.add_event_detect(channel, GPIO.FALLING, bouncetime=300)

while True:
    if GPIO.event_detected(channel):
        print("Switch triggered")
        r = requests.get(webtask)
        # TODO - At this point we should check to see if we set the state
        # successfully. If not, we should implemenmt retry logic to try again.
