/* eslint-disable no-param-reassign */
import { createSlice, combineReducers } from '@reduxjs/toolkit'

const initialTicketsState = {
  tickets: [],
  loading: true,
  error: [],
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: initialTicketsState,
  reducers: {
    setTickets(state, action) {
      state.tickets = action.payload
    },
    addTickets(state, action) {
      state.tickets = [...state.tickets, ...action.payload]
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    addError(state, action) {
      state.error.push(action.payload)
    },
    clearError(state) {
      state.error = []
    },
  },
})

const initialFiltersState = {
  all: true,
  none: true,
  one: true,
  two: true,
  three: true,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFiltersState,
  reducers: {
    setFilter(state, action) {
      const { filter, value } = action.payload
      if (filter === 'all') {
        state.all = value
        state.none = value
        state.one = value
        state.two = value
        state.three = value
      } else {
        state[filter] = value
        if (!value && state.all) {
          state.all = false
        } else if (state.none && state.one && state.two && state.three) {
          state.all = true
        }
      }
    },
  },
})

const initialSortState = 'cheapest'

const sortSlice = createSlice({
  name: 'sort',
  initialState: initialSortState,
  reducers: {
    setSort(state, action) {
      return action.payload
    },
  },
})

export const { setTickets, addTickets, setLoading, addError, clearError } = ticketsSlice.actions
export const { setFilter } = filtersSlice.actions
export const { setSort } = sortSlice.actions

export default combineReducers({
  tickets: ticketsSlice.reducer,
  filters: filtersSlice.reducer,
  sort: sortSlice.reducer,
})
