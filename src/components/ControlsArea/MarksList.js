import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { removePlacemark, sortPlacemarks } from '@/redux/ducks/geo'
import Sortable from '@/components/hocs/Sortable'
import css from './MarksList.sass'

const MarksList = ({ placemarks, removePlacemark, sortPlacemarks }) => {
	return (
		<ul className="panel">
			{placemarks.map(({ id, properties }, index) => (
				<Sortable
					key={id}
					className={cls('panel-block', css.item)}
					onSortItems={sortPlacemarks}
					items={placemarks}
					sortId={index}
				>
					<span className={css.itemText}>{properties.text}</span>
					<span className={css.itemRemove} onClick={() => removePlacemark(id)}>&times;</span>
				</Sortable>
			))}
		</ul>
	)
}

MarksList.propTypes = {
	
}

const mapStateToProps = state => ({
	placemarks: state.geo.placemarks
})

const mapDispatchToProps = {
	removePlacemark,
	sortPlacemarks
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksList)