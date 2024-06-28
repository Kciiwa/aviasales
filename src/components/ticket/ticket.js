import React from 'react'
import { addMinutes, format } from 'date-fns'
import './ticket.scss'
import { pluralize } from 'numeralize-ru'

function Ticket({ carrier, price, segments }) {
  const segment1 = segments[0]
  const segment2 = segments[1]

  const timeOfDeparture1 = format(segment1.date, 'hh:mm')
  const timeOfArrival1 = format(addMinutes(segment1.date, segment1.duration), 'hh:mm')

  const timeOfDeparture2 = format(segment2.date, 'hh:mm')
  const timeOfArrival2 = format(addMinutes(segment2.date, segment2.duration), 'hh:mm')

  const hours1 = Math.floor(segment1.duration / 60)
  const minutes1 = segment1.duration % 60

  const hours2 = Math.floor(segment2.duration / 60)
  const minutes2 = segment2.duration % 60

  const numberOfTransfers = pluralize(segment1.stops.length, 'пересадка', 'пересадки', 'пересадок')

  return (
    <li className="ticket">
      <div className="first-string">
        <p className="ticket__price">{price}</p>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" width={110} />
      </div>
      <div className="ticket__info">
        <div className="segment">
          <div className="direction">
            <p className="ticket__title">
              {segment1.origin} - {segment1.destination}
            </p>
            <p>
              {timeOfDeparture1} - {timeOfArrival1}
            </p>
          </div>
          <div className="duration">
            <p className="ticket__title">В пути</p>
            <p>
              {hours1}ч {minutes1}м
            </p>
          </div>
          <div className="stops">
            <p className="ticket__title">
              {segment1.stops.length === 0
                ? 'Без пересадок'
                : `${segment1.stops.length} ${numberOfTransfers}`}
            </p>
            <p className="transfers">{segment1.stops.join(', ')}</p>
          </div>
        </div>
        <div className="segment">
          <div className="direction">
            <p className="ticket__title">
              {segment2.origin} - {segment2.destination}
            </p>
            <p>
              {timeOfDeparture2} - {timeOfArrival2}
            </p>
          </div>
          <div className="duration">
            <p className="ticket__title">В пути</p>
            <p>
              {hours2}ч {minutes2}м
            </p>
          </div>
          <div className="stops">
            <p className="ticket__title">
              {segment2.stops.length === 0
                ? 'Без пересадок'
                : `${segment2.stops.length} ${numberOfTransfers}`}
            </p>
            <p className="transfers">{segment2.stops.join(', ')}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Ticket
