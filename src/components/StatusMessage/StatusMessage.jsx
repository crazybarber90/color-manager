import React from 'react'
import './StatusMessage.css'

const StatusMessage = ({ status, error }) => {
  if (status === 'loading') {
    return <p className="loading">Ucitavanje boja...</p>
  }

  if (status === 'failed') {
    return <p className="error">Greska: {error}</p>
  }

  return null
}

export default StatusMessage
