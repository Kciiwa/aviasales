import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import './filters.scss'

function FilterList({ title, filters }) {
  return (
    <div className="filters">
      <h2 className="filters__title">{title.toUpperCase()}</h2>
      {filters.map((filter) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="filters__label">
          <div className="filter-wrapper">
            <input
              type="checkBox"
              className="filters__input"
              defaultChecked={filter.isChecked}
              key={uuidv4()}
            />
            {filter.name}
          </div>
        </label>
      ))}
    </div>
  )
}

export default FilterList
