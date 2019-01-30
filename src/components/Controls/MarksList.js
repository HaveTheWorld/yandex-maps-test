import React from 'react'
import T from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { removePlacemark, sortPlacemarks } from '@/redux/ducks/geo'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Mark from './Mark'

const MarksList = ({ placemarks, removePlacemark, sortPlacemarks }) => {
	return (
		<ul className="panel">
			{placemarks.map(({ id, properties }, index) => (
				<Mark
					key={id}
					id={id}
					text={properties.text}
					onRemove={removePlacemark}
					index={index}
					movePlacemark={sortPlacemarks}
				/>
			))}
		</ul>
	)
}

MarksList.propTypes = {
	placemarks: T.arrayOf(
		T.shape({
			id: T.number.isRequired,
			properties: T.object.isRequired
		})
	).isRequired,
	removePlacemark: T.func.isRequired,
	sortPlacemarks: T.func.isRequired
}

const mapStateToProps = state => ({
	placemarks: state.geo.placemarks
})

const mapDispatchToProps = {
	removePlacemark,
	sortPlacemarks
}

export default compose(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, mapDispatchToProps)
)(MarksList)