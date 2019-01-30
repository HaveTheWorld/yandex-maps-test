import React from 'react'
import Search from './Search'
import MarksList from './MarksList'
import css from './Controls.sass'

const Controls = () => {
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

export default Controls