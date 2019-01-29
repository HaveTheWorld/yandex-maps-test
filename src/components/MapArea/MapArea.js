import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Map } from 'react-yandex-maps'
import css from './MapArea.sass'

const mapState = {
	center: [55.751574, 37.573856],
	zoom: 9,
	controls: ['zoomControl', 'fullscreenControl']
}

const MapArea = () => {
	return (
		<div className={css.area}>
			<Map defaultState={mapState} className={cls('is-overlay', css.map)}>
				
			</Map>
		</div>
	)
}

MapArea.propTypes = {
	
}

export default MapArea