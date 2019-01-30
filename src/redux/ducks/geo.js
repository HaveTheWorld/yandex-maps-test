import { center } from '@/config'

/* ===== Constants ===== */
export const moduleName = 'geo'

export const ADD_PLACEMARK = `${moduleName}/ADD_PLACEMARK`
export const REMOVE_PLACEMARK = `${moduleName}/REMOVE_PLACEMARK`

/* ===== Initial state ===== */
const initialState = {
	center,
	placemarks: [],
}

/* ===== Reducer ===== */
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_PLACEMARK:
			return { ...state, placemarks: [...state.placemarks, payload], center: payload.coords }
		case REMOVE_PLACEMARK:
			return { ...state, placemarks: state.placemarks.filter(({ id }) => id !== payload) }

		default:
			return state
	}
}

/* ===== Action creators ===== */
export const addPlacemark = placemark => ({ type: ADD_PLACEMARK, payload: placemark })
export const removePlacemark = placemarkId => ({ type: REMOVE_PLACEMARK, payload: placemarkId })