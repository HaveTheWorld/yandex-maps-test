import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { connect } from 'react-redux'
import { removePlacemark } from '@/redux/ducks/geo'
import css from './MarksList.sass'

const MarksList = ({ placemarks, removePlacemark }) => {
	return (
		<ul className="panel">
			{placemarks.map(({ id, properties }) => (
				<li
					key={id}
					className={cls('panel-block', css.item)}
					onClick={() => removePlacemark(id)}
				>
					<span className={css.itemText}>{properties.text}</span>
					<span className={css.itemRemove}>&times;</span>
				</li>
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
	removePlacemark
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksList)