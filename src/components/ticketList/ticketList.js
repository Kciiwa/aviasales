import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import Ticket from '../ticket/ticket'
import './ticketList.scss'
import Loader from '../ticketsLoader/ticketsLoader'
import { selectSortedTickets, selectLoading } from '../../redux/selectors'

function TicketList() {
  const sortedTickets = useSelector(selectSortedTickets)
  const loading = useSelector(selectLoading)
  const [visibleTicketsCount, setVisibleTicketsCount] = useState(5)

  const handleShowMore = () => {
    setVisibleTicketsCount((prevCount) => prevCount + 5)
  }

  return (
    <div>
      {loading && <Loader />}
      {sortedTickets.length === 0 ? (
        <p className="no-flights-message">Рейсов, подходящих под заданные фильтры, не найдено</p>
      ) : (
        <>
          <ul className="ticket-list">
            {sortedTickets.slice(0, visibleTicketsCount).map((ticket) => (
              <Ticket
                key={uuidv4()}
                price={ticket.price}
                carrier={ticket.carrier}
                segments={ticket.segments}
              />
            ))}
          </ul>
          {visibleTicketsCount < sortedTickets.length && (
            <button type="button" className="show-more" onClick={handleShowMore}>
              Показать ещё 5 билетов
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default TicketList
