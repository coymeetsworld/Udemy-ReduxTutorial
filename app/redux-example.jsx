var redux = require('redux');

console.log('Starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// Subscribe to changes
// called each time store state changes. 
// returns a function you can unsubscribe to.
var unsubscribe = store.subscribe(() => {
	var state = store.getState();	
	console.log('New state', store.getState());
	
	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'Loading...';
	} else if (state.map.url) {
		document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
	}
});

var currentState = store.getState();

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Coy'));
store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Writing'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.addMovie('Remember the Titans', 'Drama'));
store.dispatch(actions.addMovie('Empire Strikes Back', 'Sci-fi'));
store.dispatch(actions.addMovie('Spaceballs', 'Comedy'));
store.dispatch(actions.removeMovie(1));
// unsubscribe();
// subscribe callback won't run if unsubscribe is uncommented
store.dispatch(actions.changeName('Miranda'));