import React from 'react'
import './ticketsLoader.scss'
import { Card } from 'antd'

function Loader() {
  return (
    <div className="loader">
      <Card loading />
    </div>
  )
}

export default Loader
