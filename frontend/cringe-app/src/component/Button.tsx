
import React from 'react'

interface buttonProps{
    addPoint: () => void,
    delPoint: () => void,
    changePlayerPoint: () => void,
    name: string

}

export const Button: React.FC<buttonProps> = ({addPoint, delPoint, changePlayerPoint, name}) => {
  return (
    <div className='buttonSec'>
          <button onClick={addPoint}>Add point</button>
          <button onClick={delPoint}>Sub point</button>
          <button onClick={changePlayerPoint}>Point for : {name}</button>
      </div>
  )
}
