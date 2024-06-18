import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

const fetchTickets = async (searchId) => {
  try {
    const response = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    )
    if (!response.ok) {
      throw new Error('Server response error')
    }
    const data = response.json()
    return data
  } catch (error) {
    console.error('failed to get tickets', error)
    return null
  }
}

function useGetTickets(searchId) {
  const [tickets, setTickets] = useState([])

  const debouncedFetchTickets = useCallback(
    debounce(async () => {
      if (searchId) {
        const res = await fetchTickets(searchId)
        if (res && res.tickets) {
          setTickets(res.tickets.slice(0, 5))
        }
      }
    }, 600),
    [searchId]
  )

  useEffect(() => {
    debouncedFetchTickets(searchId)
  }, [searchId, debouncedFetchTickets])

  //   setTickets(fetchTickets(searchId))
  return tickets
}

export default useGetTickets
