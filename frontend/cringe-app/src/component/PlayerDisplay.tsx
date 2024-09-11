
import React from 'react'

interface PlayerDisplayProps{
    playerName: string,
    playerPoint: number
}

export const PlayerDisplay: React.FC<PlayerDisplayProps> = ({playerName, playerPoint}) => {
  return (
    <div>
        <p>{playerName}</p>
        <h1>{playerPoint}</h1>
    </div>
  )
}
