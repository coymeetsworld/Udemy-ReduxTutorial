var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
	showCompleted: false,
	searchText: '',
	todos: []
};
var reducer = (state = stateDefault, action) => {
	
	switch(action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			};
		default:
			return state;
	}
	
};

var store = redux.createStore(reducer);

console.log('currentState', store.getState());

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'dragons'
});

console.log('currentState', store.getState());