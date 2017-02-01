import React from 'react';
import {partial} from '../../lib/utils';

export const TodoItem = (props) => {

  // All 3 of the following handleToggle functions do the same thing
  // const handleToggle = () => props.handleToggle(props.id)
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id);

  const handleRemove = partial(props.handleRemove, props.id);

  return (
    <li>
      <span className='delete-item'><a href="#" onClick={handleRemove}>X</a></span>
      <input type="checkbox"
        onChange={handleToggle}
        checked={props.isComplete}/>
      {props.name}
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
