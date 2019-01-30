import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { Map, Placemark } from 'react-yandex-maps'
import { controls } from '@/config'
import RouteLine from './RouteLine'
import css from './MapArea.sass'

const MapArea = ({ center, placemarks }) => {
	const mapState = { center, zoom: 13, controls }

	return (
		<div className={css.area}>
			<Map state={mapState} className={cls('is-overlay', css.map)}>
				{placemarks.map(({ id, coords, properties }) => (
					<Placemark
						key={id}
						defaultGeometry={coords}
						defaultProperties={properties}
					/>
				))}
				<RouteLine placemarks={placemarks} />
			</Map>
		</div>
	)
}

MapArea.propTypes = {
	
}

const mapStateToProps = state => ({
	center: state.geo.center,
	placemarks: state.geo.placemarks
})

export default connect(mapStateToProps)(MapArea)