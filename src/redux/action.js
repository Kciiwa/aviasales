/* eslint-disable no-promise-executor-return */

import { createAsyncThunk } from '@reduxjs/toolkit'

import { setLoading, addError, addTickets } from './reducers'

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { dispatch }) => {
    const maxAttempts = 3
    let attempts = 0
    let stop = false

    dispatch(setLoading(true))

    while (!stop && attempts < maxAttempts) {
      try {
        const response = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        )
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`)
        }
        attempts = 0
        const data = await response.json()
        dispatch(addTickets(data.tickets))
        stop = data.stop
      } catch (error) {
        attempts++
        dispatch(addError(error.message))
        if (attempts >= maxAttempts) {
          console.error('Не удалось загрузить данные. Попробуйте позже.')
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
    }

    dispatch(setLoading(false))
  }
)

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { dispatch }) => {
  const maxAttempts = 5
  let attempts = 0

  while (attempts < maxAttempts) {
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search')
      if (!response.ok) {
        console.error(`Status: ${response.status}`)
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
})
