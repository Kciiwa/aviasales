import { createSelector } from '@reduxjs/toolkit'

export const selectTickets = (state) => state.tickets
export const selectSort = (state) => state.sort
export const selectFilters = (state) => state.filters

export const selectSortedTickets = createSelector(
  [selectTickets, selectSort, selectFilters],
  (tickets, sort, filters) => {
    const filteredTickets = tickets.filter((ticket) => {
      const stops = ticket.segments[0].stops.length
      if (filters.all) return true
      if (stops === 0 && filters.none) return true
      if (stops === 1 && filters.one) return true
      if (stops === 2 && filters.two) return true
      if (stops === 3 && filters.three) return true
      return false
    })

    switch (sort) {
    case 'cheapest':
      return filteredTickets.slice().sort((a, b) => a.price - b.price)
    case 'fastest':
      return filteredTickets.slice().sort((a, b) => {
        const aDuration = a.segments.reduce((sum, segment) => sum + segment.duration, 0)
        const bDuration = b.segments.reduce((sum, segment) => sum + segment.duration, 0)
        return aDuration - bDuration
      })
    case 'optimal':
      return filteredTickets.slice().sort((a, b) => {
        const aDuration = a.segments.reduce((sum, segment) => sum + segment.duration, 0)
        const bDuration = b.segments.reduce((sum, segment) => sum + segment.duration, 0)
        const aOptimal = a.price + aDuration
        const bOptimal = b.price + bDuration
        return aOptimal - bOptimal
      })
    default:
      return filteredTickets
    }
  }
)
