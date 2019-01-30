import React from 'react'
import Item from './Item'

class SortableList extends React.Component {

  state = {
    items: this.props.items
  }

  onSortItems = (items) => {
    this.setState({
      items: items
    })
  }

  render() {
    const { items } = this.state
    var listItems = items.map((item, i) => {
      return (
        <Item
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          item={item}
          sortId={i}
        />
      )
    })

    return (
      <ul className='sortable-list'>
        {listItems}
      </ul>
    )
  }
}

export default SortableList