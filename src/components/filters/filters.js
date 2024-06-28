import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import './filters.scss'
import { useDispatch, useSelector } from 'react-redux'

import { setFilter } from '../../redux/reducers'

function FilterList({ title }) {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const handleCheckboxChange = (filter) => {
    dispatch(setFilter({ filter, value: !filters[filter] }))
  }

  const filterList = [
    { name: 'Все', filter: 'all' },
    { name: 'Без пересадок', filter: 'none' },
    { name: '1 пересадка', filter: 'one' },
    { name: '2 пересадки', filter: 'two' },
    { name: '3 пересадки', filter: 'three' },
  ]

  return (
    <div className="filters">
      <h2 className="filters__title">{title.toUpperCase()}</h2>
      {filterList.map((filterItem) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="filters__label" key={uuidv4()}>
          <div className="filter-wrapper">
            <input
              type="checkBox"
              className="filters__input"
              checked={filters[filterItem.filter]}
              onChange={() => handleCheckboxChange(filterItem.filter)}
            />
            <span className="checkbox" />
            {filterItem.name}
          </div>
        </label>
      ))}
    </div>
  )
}

export default FilterList
