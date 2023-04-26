import React from 'react'

export default function ContextMenu({ contextMenuArr }) {
  return (
    <div className='contextMenu'>
      {contextMenuArr.map((item, index) =>
        <div
          className='contextMenu__item'
          onClick={item.function}
          key={Math.random() + index}
        >
          {item.title}
        </div>
      )}
    </div>
  )
}
