import { center } from '@/config'

/* ===== Constants ===== */
export const moduleName = 'geo'

export const ADD_PLACEMARK = `${moduleName}/ADD_PLACEMARK`
export const REMOVE_PLACEMARK = `${moduleName}/REMOVE_PLACEMARK`
export const SORT_PLACEMARKS = `${moduleName}/SORT_PLACEMARKS`
export const MOVE_PLACEMARK = `${moduleName}/MOVE_PLACEMARK`

/* ===== Initial state ===== */
const initialState = {
	counter: 0,
	center,
	placemarks: []
}

/* ===== Reducer ===== */
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_PLACEMARK: {
			const counter = state.counter + 1
			const placemarks = [...state.placemarks, { ...payload, id: counter }]
			return { ...state, counter, placemarks , center: payload.coords }
		}
		case REMOVE_PLACEMARK: {
			const placemarks = state.placemarks.filter(({ id }) => id !== payload)
			const center = placemarks.length ? placemarks[placemarks.length - 1].coords : state.center
			return { ...state, placemarks, center }
		}
		case SORT_PLACEMARKS:
			return { ...state, placemarks: payload }
		case MOVE_PLACEMARK: {
			const { id, coords } = payload
			const placemarks = state.placemarks.map(placemark => {
				return placemark.id === id ? { ...placemark, coords } : placemark
			})
			return { ...state, placemarks }
		}

		default:
			return state
	}
}

/* ===== Action creators ===== */
export const addPlacemark = placemark => ({ type: ADD_PLACEMARK, payload: placemark })

export const removePlacemark = placemarkId => ({ type: REMOVE_PLACEMARK, payload: placemarkId })

export const sortPlacemarks = (dragIndex, hoverIndex) => (dispatch, getState) => {
	const { placemarks } = getState()[moduleName]
	const dragPlacemark = placemarks[dragIndex]

	const newPlacemarks = placemarks.filter((card, index) => index !== dragIndex)
	newPlacemarks.splice(hoverIndex, 0, dragPlacemark)
	
	dispatch({ type: SORT_PLACEMARKS, payload: newPlacemarks })
}

export const movePlacemark = (id, coords) => ({ type: MOVE_PLACEMARK, payload: { id, coords } })