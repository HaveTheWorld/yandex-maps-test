import React from 'react'
import T from 'prop-types'
import { Polyline } from 'react-yandex-maps'

const options = {
	balloonCloseButton: false,
	strokeColor: '#333',
	strokeWidth: 5,
	strokeOpacity: 0.5
}

const RouteLine = ({ placemarks }) => {
	const geometry = placemarks.map(({ coords }) => coords)

	return (
		<Polyline geometry={geometry} options={options}	/>
	)
}

RouteLine.propTypes = {
	placemarks: T.arrayOf(
		T.shape({
			coords: T.arrayOf(T.number.isRequired)
		})
	).isRequired
}

export default RouteLine