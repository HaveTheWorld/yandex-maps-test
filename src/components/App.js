import React from 'react'
import { hot } from 'react-hot-loader/root'
import T from 'prop-types'
import cls from 'classnames'
import ControlsArea from './ControlsArea'
import MapArea from './MapArea'
import css from './App.sass'

const App = () => {
	return (
		<div className={cls('container', 'is-fluid', css.app)}>
			<ControlsArea />
			<MapArea />
		</div>
	)
}

App.propTypes = {
	
}

export default hot(App)