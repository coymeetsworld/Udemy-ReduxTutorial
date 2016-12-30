var redux = require('redux');

console.log('Starting redux example');


// Name reducer and action generators
// ----------------------------------
var nameReducer = (state = 'Anonymous', action) => {
	switch(action.type) {
		case 'CHANGE_NAME':
			return action.name
		default:
			return state;
	}
};

// Action generator abstracts the logic of the action.
var changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name //same as name: name
	};
};

var addHobby = (hobby) => {
	return {
		type: 'ADD_HOBBY',
		hobby
	};
};

var removeHobby = (id) => {
	return {
		type: 'REMOVE_HOBBY',
		id
	};
};

var addMovie = (title, genre) => {
	return {
		type: 'ADD_MOVIE',
		title,
		genre
	};
};

var removeMovie = (id) => {
	return {
		type: 'REMOVE_MOVIE',
		id
	};
};

// Hobbies reducer and action generators
// ----------------------------------
var nextHobbyId = 1;
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

// Movies reducer and action generators
// ----------------------------------
var nextMovieId = 1;
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

store.dispatch(changeName('Coy'));
store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Writing'));
store.dispatch(removeHobby(2));
store.dispatch(addMovie('Remember the Titans', 'Drama'));
store.dispatch(addMovie('Empire Strikes Back', 'Sci-fi'));
store.dispatch(addMovie('Spaceballs', 'Comedy'));
store.dispatch(removeMovie(1));
// unsubscribe();
// subscribe callback won't run if unsubscribe is uncommented
store.dispatch(changeName('Miranda'));