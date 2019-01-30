import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import geo from './ducks/geo'

export default () => {
	const reducer = combineReducers({
		geo
	})

	const enhancer = composeWithDevTools(
		applyMiddleware(
			thunk
		)
	)

	const store = createStore(reducer, {}, enhancer)

	return store
}