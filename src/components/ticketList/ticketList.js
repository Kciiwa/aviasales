// import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Ticket from '../ticket/ticket'
import './ticketList.scss'
import useGetTickets from '../../hooks/useGetTickets/useGetTickets'

function TicketList({ searchId }) {
  const tickets = useGetTickets(searchId)
  //   console.log(`ticketsList ${tickets}`)

  //   const renderTicket = (carrier, price, segments) => (
  //     <Ticket carrier={carrier} price={price} segments={segments} key={uuidv4()} />
  //   )

  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <Ticket
          key={uuidv4()}
          price={ticket.price}
          carrier={ticket.carrier}
          segments={ticket.segments}
        />
      ))}
    </ul>
  )
}

export default TicketList
