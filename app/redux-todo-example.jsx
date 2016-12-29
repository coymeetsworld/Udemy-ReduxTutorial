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

var store = redux.createStore(reducer, redux.compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe(() => {
	var state = store.getState();
	console.log('Search text:', state.searchText);	
	document.getElementById('app').innerHTML = state.searchText;
});

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'mail'
});
store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'laundry'
});
store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'read'
});