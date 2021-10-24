import React from 'react'

export const CommentsList = ({ comments }) => {
  if (comments) {
    return (
      <ul>
        {
          comments.map(({ nombre, apellido, comment }) => {
            return (
              <li>
                <p><b>{nombre}{' '}{apellido}</b>: {' ' + comment}</p>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
