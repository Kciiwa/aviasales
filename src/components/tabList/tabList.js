import React from 'react'

import './tabList.scss'

function TabList() {
  const tabs = [
    { tabDescription: 'самый дешевый', isActive: true },
    { tabDescription: 'самый быстрый', isActive: false },
    { tabDescription: 'оптимальный', isActive: false },
  ]

  // const styles = ['tab-list__item']

  return (
    <ul className="tab-list">
      {tabs.map((tab) => (
        <li className={tab.isActive ? 'tab-list__item active-tab' : 'tab-list__item inactive-tab'}>
          {tab.tabDescription.toUpperCase()}
        </li>
      ))}
    </ul>
  )
}

export default TabList
