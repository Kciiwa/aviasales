import { useEffect, useState } from 'react'

function useGetSearchId() {
  const [searchId, setSearchId] = useState(null)

  useEffect(() => {
    const createSearchId = async () => {
      try {
        const response = await fetch('https://aviasales-test-api.kata.academy/search')
        const data = await response.json()
        setSearchId(data.searchId)
        // console.log(`data ${data.searchId}`)
      } catch (error) {
        console.error('Failed to login')
      }
      return null
    }
    createSearchId()
  }, [])
  return searchId
}

export default useGetSearchId
