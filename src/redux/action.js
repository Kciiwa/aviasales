/* eslint-disable no-promise-executor-return */
import { addTickets, setLoading, addError } from './reducers'

export const fetchTickets = (searchId) => async (dispatch) => {
  let stop = false
  dispatch(setLoading(true))
  const maxAttempts = 10
  let attempts = 0

  while (!stop) {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      )
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`)
      }
      const data = await response.json()
      dispatch(addTickets(data.tickets))
      stop = data.stop
    } catch (error) {
      attempts++
      dispatch(addError(error.message))
      if (attempts >= maxAttempts) {
        stop = true
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  }

  dispatch(setLoading(false))
}

export const fetchSearchId = () => async (dispatch) => {
  const maxAttempts = 5
  let attempts = 0

  while (attempts < maxAttempts) {
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search')
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`)
      }
      const data = await response.json()
      const { searchId } = data
      dispatch(fetchTickets(searchId))
      return
    } catch (error) {
      attempts++
      dispatch(addError(error.message))
      if (attempts === maxAttempts) {
        break
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  }
}
