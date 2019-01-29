import React from 'react'
import T from 'prop-types'
import css from './ControlsArea.sass'

const ControlsArea = () => {
	return (
		<div className={css.area}>
			<div className={css.newPoint}>
				<div className="field has-addons">
					<div className="control">
						<input type="text" className="input" placeholder="Новая точка" />
					</div>
						<button className="button">Добавить</button>
				</div>
			</div>
			<div className={css.pointsList}>
				
			</div>
		</div>
	)
}

ControlsArea.propTypes = {
	
}

export default ControlsArea