import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { movePlacemark } from '@/redux/ducks/geo'
import { Map, Placemark } from 'react-yandex-maps'
import { controls } from '@/config'
import RouteLine from './RouteLine'
import css from './MapArea.sass'

const MapArea = ({ center, placemarks, movePlacemark }) => {
	const mapState = { center, zoom: 13, controls }

	const onDragEnd = id => e => {
		const { geometry } = e.originalEvent.target
		const coords = geometry.getCoordinates()
		movePlacemark(id, coords)
	}

	return (
		<div className={css.area}>
			<Map state={mapState} className={cls('is-overlay', css.map)}>
				{placemarks.map(({ id, coords, properties }) => (
					<Placemark
						key={id}
						defaultGeometry={coords}
						defaultProperties={properties}
						options={{ draggable: true }}
						onDragEnd={onDragEnd(id)}
					/>
				))}
				<RouteLine placemarks={placemarks} />
			</Map>
		</div>
	)
}

MapArea.propTypes = {
	center: T.arrayOf(T.number.isRequired).isRequired,
	placemarks: T.arrayOf(
		T.shape({
			id: T.number.isRequired,
			coords: T.arrayOf(T.number.isRequired),
			properties: T.object.isRequired
		})
	).isRequired,
	movePlacemark: T.func.isRequired
}

const mapStateToProps = state => ({
	center: state.geo.center,
	placemarks: state.geo.placemarks
})

const mapDispatchToProps = {
	movePlacemark
}

export default connect(mapStateToProps, mapDispatchToProps)(MapArea)