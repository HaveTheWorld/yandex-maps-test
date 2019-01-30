import React from 'react'
import T from 'prop-types'
import Search from './Search'
import MarksList from './MarksList'
import css from './ControlsArea.sass'

const ControlsArea = () => {
	return (
		<div className={css.area}>
			<div className={css.newPoint}>
				<Search />
			</div>
			<div className={css.pointsList}>
				<MarksList />
			</div>
		</div>
	)
}

ControlsArea.propTypes = {
	
}

export default ControlsArea