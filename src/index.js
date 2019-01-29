import React from 'react'
import { render } from 'react-dom'
import { YMaps } from 'react-yandex-maps'
import App from '@/components/App'
import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'

const modules = [
	'Map',
	'Placemark',
	'GeoObject',
	'control.ZoomControl',
	'control.FullscreenControl',
	'geoObject.addon.balloon'
]

const query = {
	ns: 'use-load-option',
	load: modules.join(',')
}

render(
	<YMaps query={query}>
		<App />
	</YMaps>,
	document.getElementById('root')
)