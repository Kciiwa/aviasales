import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.scss'
import FilterList from './components/filters/filters'
import TabList from './components/tabList/tabList'
import TicketList from './components/ticketList/ticketList'
import { fetchSearchId } from './redux/action'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSearchId())
  }, [dispatch])

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
      <div className="logo">
        <img
          src="https://kata-react-aviasales.dev.m1w.ru/static/media/plane.694b49ceff1942096b4c761b597b6d75.svg"
          alt="aviasales-plane-logo"
          className="aviasales-plane-logo"
        />
        <img
          src="https://kata-react-aviasales.dev.m1w.ru/static/media/globe.7f99fbbae5d61448eba65d2cc3f80d44.svg"
          alt="aviasales-background-logo"
          className="aviasales-background-logo"
        />
      </div>
      <div className="app-wrapper">
        <FilterList title={filterList.title} filters={filterList.filters} />
        <div className="list-wrapper">
          <TabList />
          <TicketList />
        </div>
      </div>
    </main>
  )
}

export default App
