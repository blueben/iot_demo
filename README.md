A very simple IoT demo using the RaspberryPi, Python, and Webtask.io

Files:

Doormon.js - A webtask which implements a simple API to set and get the status
of a door switch.

DoorWatcher.py - A python script meant to run on a RaspberryPi which reports
the status of a door switch to the Doormon webtask.

doorswitch.jpg - A photograph of a prototype doorswitch.

GetLogger.js - The beginning of another webtask which was intended to accept
and store data from the ODBII monitoring application 'Torque' on Android. While
the webtask works as-written, it was abandoned because the android application
does not support sending over HTTPS, while Webtask.io only supports HTTPS.
