import React from 'react'
import T from 'prop-types'
import { sortable } from 'react-sortable'

const Item = props => {
	return (
		<li {...props}>
			{props.children}
		</li>
	)
}

Item.propTypes = {
	
}

export default sortable(Item)