export default {
  name: 'blockContent',
  type: 'object',
  title: 'Block content',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [{
        type: 'block',
        marks: {
          annotations: [
            {
              name: 'internalLink',
              type: 'object',
              title: 'Internal link',
              fields: [
                {
                  name: 'reference',
                  type: 'reference',
                  title: 'Reference',
                  to: [
                    { type: 'page' }
                  ]
                }
              ]
            },
            {
              name: 'link',
              type: 'object',
              title: 'External link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL'
                }
              ]
            },
          ]
        }
      }]
    }
  ]
}