import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import initStore from '@/redux/init-store'
import { YMaps } from 'react-yandex-maps'
import { query } from '@/config'
import App from '@/components/App'
import 'bulma/bulma.sass'
import '@/assets/sass/main.sass'

const store = initStore()

render(
	<Provider store={store}>
		<YMaps query={query}>
			<App />
		</YMaps>
	</Provider>,
	document.getElementById('root')
)