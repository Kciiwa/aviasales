// import { useEffect, useState } from 'react'

import './App.scss'
import FilterList from './components/filters/filters'
// import Tab from './components/tab/tab'
import TabList from './components/tabList/tabList'
import TicketList from './components/ticketList/ticketList'
import useGetSearchId from './hooks/useGetSearchId/useGetSearchId'

function App() {
  const searcId = useGetSearchId()

  const filterList = {
    title: 'количество пересадок',
    filters: [
      { name: 'Все', isChecked: false },
      { name: 'Без пересадок', isChecked: true },
      { name: '1 пересадка', isChecked: true },
      { name: '2 пересадки', isChecked: true },
      { name: '3 пересадки', isChecked: false },
    ],
  }

  return (
    <main className="app">
      {/* <div className="App">{searcId}</div> */}
      <FilterList title={filterList.title} filters={filterList.filters} />
      <div className="list-wrapper">
        <TabList />
        <TicketList searchId={searcId} />
      </div>
    </main>
  )
}

export default App
