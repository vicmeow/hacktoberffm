import React from 'react'

export default {
  title: 'Comment',
  name: 'comment',
  type: 'document',
  readOnly: true,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'text'
    }
  ]
}
