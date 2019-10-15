import React from 'react'

export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Guide', value: 'guide' },
          { title: 'Project', value: 'project' },
          { title: 'Article', value: 'article'}
        ]
      }
    },
    {
      name: 'url',
      title: 'URL',
      type: 'urlWithMetadata'
    }
  ],
  preview: {
    select: {
      url: 'url',
      type: 'type'
    },
    prepare(value) {
      const emoji = (type) => {
        const emoji = {
          article: '📰',
          guide: '📖',
          project: '📓'
        }
        return <span role="img" style={{fontSize: '2rem'}}>{emoji[type]}</span>
      }
      return {
        title: value.url.openGraph.title,
        subtitle: value.url.openGraph.siteName,
        media: emoji(value.type)
      }
    }
  }
}
