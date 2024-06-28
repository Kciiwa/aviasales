import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import './tabList.scss'
import { setSort } from '../../redux/reducers'

function TabList() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('cheapest')

  const tabs = [
    { tabDescription: 'самый дешевый', sortOption: 'cheapest' },
    { tabDescription: 'самый быстрый', sortOption: 'fastest' },
    { tabDescription: 'оптимальный', sortOption: 'optimal' },
  ]

  const handleSortChange = (sortOption) => {
    setActiveTab(sortOption)
    dispatch(setSort(sortOption))
  }

  return (
    <ul className="tab-list">
      {tabs.map((tab) => (
        <button
          type="button"
          className={
            tab.sortOption === activeTab
              ? 'tab-list__item active-tab'
              : 'tab-list__item inactive-tab'
          }
          key={uuidv4()}
          onClick={() => handleSortChange(tab.sortOption)}
        >
          {tab.tabDescription.toUpperCase()}
        </button>
      ))}
    </ul>
  )
}

export default TabList
