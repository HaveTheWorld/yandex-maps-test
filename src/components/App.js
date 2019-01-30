import React from 'react'
import { hot } from 'react-hot-loader/root'
import cls from 'classnames'
import Controls from './Controls'
import MapArea from './MapArea'
import css from './App.sass'

const App = () => {
	return (
		<div className={cls('container', 'is-fluid', css.app)}>
			<Controls />
			<MapArea />
		</div>
	)
}

export default hot(App)