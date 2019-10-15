import React from 'react'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'content',
      title: 'Page content',
      type: 'array',
      of: [
        { type: 'blockContent', title: 'Block text' },
        { type: 'string', title: 'String' },
        { type: 'list', title: 'list' }
      ],
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare(selection) {

      const emoji = (type) => {
        const emoji = {
          home: '🏠',
          schedule: '🕔',
          leaderboard: '🏆',
          resources: '📚',
          register: '✍',
          'code-of-conduct': '🤝'
        }
        return () => <span role="img" style={{fontSize: '2rem'}}>{emoji[type]}</span>
      }
      return {
        title: selection.title,
        media: emoji(selection.slug.current)
      }
    }
  }
}
