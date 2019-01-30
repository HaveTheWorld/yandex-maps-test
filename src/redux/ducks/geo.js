import { center } from '@/config'

/* ===== Constants ===== */
export const moduleName = 'geo'

export const ADD_PLACEMARK = `${moduleName}/ADD_PLACEMARK`
export const REMOVE_PLACEMARK = `${moduleName}/REMOVE_PLACEMARK`
export const SORT_PLACEMARKS = `${moduleName}/SORT_PLACEMARKS`

/* ===== Initial state ===== */
const initialState = {
	center,
	placemarks: [],
}

/* ===== Reducer ===== */
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_PLACEMARK: {
			const placemarks = [...state.placemarks, payload]
			return { ...state, placemarks , center: payload.coords }
		}
		case REMOVE_PLACEMARK: {
			const placemarks = state.placemarks.filter(({ id }) => id !== payload)
			const center = placemarks.length ? placemarks[placemarks.length - 1].coords : state.center
			return { ...state, placemarks, center }
		}
		case SORT_PLACEMARKS:
			return { ...state, placemarks: payload }

		default:
			return state
	}
}

/* ===== Action creators ===== */
export const addPlacemark = placemark => ({ type: ADD_PLACEMARK, payload: placemark })
export const removePlacemark = placemarkId => ({ type: REMOVE_PLACEMARK, payload: placemarkId })
export const sortPlacemarks = placemarks => ({ type: REMOVE_PLACEMARK, payload: placemarks })