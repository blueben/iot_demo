/*
This is an extremely simple API which allows a client to track the
latest state of a door switch. It offers two actions: getState and setState.
The action is specified as part of the query string using the GET method.
This should probably be rewritten as a proper REST api.

BUGS
* Presently, the door ID is recorded but otherwise unused.
* The expected state is always a door being opened. This could be expanded
	to include duration, and door shutting.
* Presently we only handle state for a single door
*/

module.exports =
	function(ctx, dude) {

		switch(ctx.data.action) {

			/* Query string fields

			* The 'action' field here is setState
			* Field 'state' is the latest state, expected to be "opened"
			* Field 'id' is an unique ID referencing a specific door */

			case 'setState':

				console.log("Received door state " + ctx.data.state + " from door " + ctx.data.id);
				var data = { time: Date.now(), door: ctx.data.id, state: ctx.data.state }

				ctx.storage.set(JSON.stringify(data), {force: 1}, function(error) {
					if(error) {
						return dude(error);
					} else {
						dude(null, 'OK!');
					}
				});
			break;

			/* Query string fields

			* The 'action' field here is getState */

			case 'getState':

				ctx.storage.get(function(error,data) {
					if(error) {
						return dude(error);
					} else {
						console.log("Returning record: " + data)
						dude(null, data);
					}
				});
			break;
		}
}
