/* eslint-disable no-param-reassign */
import { combineReducers, createSlice } from '@reduxjs/toolkit'

const initialTicketsState = []

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: initialTicketsState,
  reducers: {
    setTickets(state, action) {
      return action.payload
    },
    addTickets(state, action) {
      return [...state, ...action.payload]
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

const initialLoadingState = true

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    setLoading(state, action) {
      return action.payload
    },
  },
})

const errorSlice = createSlice({
  name: 'error',
  initialState: [],
  reducers: {
    addError(state, action) {
      state.push(action.payload)
    },
    clearError() {
      return []
    },
  },
})

export const { setLoading } = loadingSlice.actions
export const { setTickets, addTickets } = ticketsSlice.actions
export const { setFilter } = filtersSlice.actions
export const { setSort } = sortSlice.actions
export const { addError, clearError } = errorSlice.actions

export default combineReducers({
  tickets: ticketsSlice.reducer,
  filters: filtersSlice.reducer,
  sort: sortSlice.reducer,
  loading: loadingSlice.reducer,
  error: errorSlice.reducer,
})
