import React from 'react'
import userImg from '../../images/user.png'

const UserImg = props => {
  const {img, style, className, text} = props

  return (
    <>
      {img || !text ? (
        <img alt="user" className={className || 'rounded-circle'} style={style} src={img || userImg} />
      ) : (
        <div
          style={{
            textTransform: 'uppercase',
            borderRadius: '50%',
            background: '#FDD34E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            ...style,
          }}
        >
          {text.slice(0, 1)}
        </div>
      )}
    </>
  )
}
export default UserImg
