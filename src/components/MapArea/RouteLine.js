import React from 'react'
import T from 'prop-types'
import { Polyline } from 'react-yandex-maps'

const options = {
	balloonCloseButton: false,
	strokeColor: '#990066',
	strokeWidth: 5,
	strokeOpacity: 0.7
}

const RouteLine = ({ placemarks }) => {
	const geometry = placemarks.map(({ coords }) => coords)

	return (
		<Polyline geometry={geometry} options={options}	/>
	)
}

RouteLine.propTypes = {
	
}

export default RouteLine