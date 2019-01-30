import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import css from './Mark.sass'

const Mark = ({ id, text, onRemove, isDragging, connectDragSource, connectDropTarget }) => {
	return (
		connectDragSource &&
		connectDropTarget &&
		connectDragSource(
			connectDropTarget(
				<li className={cls('panel-block', css.mark, { [css.isDragging]: isDragging })}>
					<span className={css.markText}>{text}</span>
					<span className={css.markRemove} onClick={() => onRemove(id)}>&times;</span>
				</li>
			)
		)
	)
}

/* ===== Source ===== */

const sourceSpec = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const sourceCollect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
})

/* ===== Target ===== */

const targetSpec = {
	hover(props, monitor, component) {
		if (!component) return null

		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) return null

		// Determine rectangle on screen
		// eslint-disable-next-line
		const hoverBoundingRect = findDOMNode(
			component
		).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.movePlacemark(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	}
}

const targetCollect = connect => ({
	connectDropTarget: connect.dropTarget(),
})

Mark.propTypes = {
	id: T.number.isRequired,
	text: T.string.isRequired,
	isDragging: T.bool.isRequired,
	connectDragSource: T.func.isRequired,
	connectDropTarget: T.func.isRequired
}

export default
	DropTarget('card', targetSpec, targetCollect)(
		DragSource('card', sourceSpec, sourceCollect)(
			Mark
		)
	)