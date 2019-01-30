import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { addPlacemark } from '@/redux/ducks/geo'
import { withYMaps } from 'react-yandex-maps'
import css from './Search.sass'

class Search extends React.Component {
	state = {
		query: '',
		geoObjects: []
	}

	timer

	onSearch = e => {
		e.persist()
		this.setState({ query: e.target.value })
		clearTimeout(this.timer)
		this.timer = setTimeout(async () => {
			const { geoObjects } = await this.props.ymaps.geocode(e.target.value , { results: 5 })
			this.setState({ geoObjects: geoObjects.toArray() })
		}, 350)
	}

	onSelect = index => {
		const obj = this.state.geoObjects[index]
		const { addPlacemark } = this.props

		const placemark = {
			coords: obj.geometry.getCoordinates(),
			properties: obj.properties.getAll()
		}

		addPlacemark(placemark)
		this.setState({ query: '', geoObjects: [] })
	}

	onSubmit = e => {
		e.preventDefault()
		this.state.geoObjects.length && this.onSelect(0)
	}

	render() {
		const { query, geoObjects } = this.state

		return (
			<form onSubmit={this.onSubmit}>
				<div className="field">
					<div className="control">
						<input
						type="search"
						className="input"
						placeholder="Новая точка"
						autoFocus
						value={query}
						onChange={this.onSearch}
					/>
					</div>
				</div>
				<div className={cls('dropdown', css.dropdown, { 'is-active': geoObjects.length })}>
					<div className={cls('dropdown-menu', css.menu)}>
						<div className={cls('dropdown-content', css.content)}>
							{geoObjects.map(({ properties }, index) => {
								const text = properties.get('text')
								return (
									<a
										key={index}
										className={cls('dropdown-item', css.item)}
										title={text}										
										onClick={() => this.onSelect(index)}
									>
										{text}
									</a>
								)
							})}
						</div>
					</div>
				</div>
			</form>
		)
	}
}

Search.propTypes = {
	
}

const mapDispatchToProps = {
	addPlacemark
}

export default compose(
	withYMaps,
	connect(null, mapDispatchToProps)
)(Search)