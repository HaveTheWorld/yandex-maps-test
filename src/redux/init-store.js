import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import geo from './ducks/geo'

export default () => {
	const reducer = combineReducers({
		geo
	})

	const enhancer = composeWithDevTools()

	const store = createStore(reducer, {}, enhancer)

	return store
}