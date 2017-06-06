module.exports = function ( ctx, done ) {
	for(var attr in ctx.data) {
		console.log(attr + ": " + ctx.data[attr]);
	}
	done(null, 'OK!');
}
