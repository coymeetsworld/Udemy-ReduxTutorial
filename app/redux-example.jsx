var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
	name: 'Anonymous',
	hobbies: [],
	movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

//state isn't an object, it's just a string because we're just managing the name.
var nameReducer = (state = 'Anonymous', action) => {
	switch(action.type) {
		case 'CHANGE_NAME':
			return action.name
		default:
			return state;
	}
};

var hobbiesReducer = (state = [], action) => {
	switch(action.type) {
		case 'ADD_HOBBY':
			return [
				...state,
				{
					id: nextHobbyId++,
					hobby: action.hobby
				}
			];
		case 'REMOVE_HOBBY':
			return state.filter((hobby) => hobby.id !== action.id);
		default:
			return state;
	}
};

var moviesReducer = (state = [], action) => {
	switch(action.type) {
		case 'ADD_MOVIE':
			return [
				...state,
				{
					id: nextMovieId++,
					title: action.title,
					genre: action.genre
				}
			];
		case 'REMOVE_MOVIE':
			return state.filter((movie) => movie.id !== action.id);
		default:
			return state;
	}
};

var reducer = redux.combineReducers({
	name: nameReducer, //name state is going to be managed by the nameReducer
	hobbies: hobbiesReducer,
	movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
	//shorthand for (f) => return f; 
));

// Subscribe to changes
// called each time store state changes. 
// returns a function you can unsubscribe to.
var unsubscribe = store.subscribe(() => {
	var state = store.getState();	
	console.log('Name is', state.name);	
	document.getElementById('app').innerHTML = state.name;
	console.log('New state', store.getState());
});

var currentState = store.getState();

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Coy'	
});

store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'Running'
});
store.dispatch({
	type: 'ADD_HOBBY',
	hobby: 'Writing'
});
store.dispatch({
	type: 'REMOVE_HOBBY',
	id: 2
});

//unsubscribe();
store.dispatch({
	type: 'ADD_MOVIE',
	title: 'Remember the Titans',
	genre: 'Drama'
});
store.dispatch({
	type: 'ADD_MOVIE',
	title: 'Empire Strikes Back',
	genre: 'Sci-fi'
});
store.dispatch({
	type: 'ADD_MOVIE',
	title: 'Spaceballs',
	genre: 'Comedy'
});
store.dispatch({
	type: 'REMOVE_MOVIE',
	id: 1
})

// subscribe callback won't run if unsubscribe is uncommented
store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Miranda'
});