export default {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Profile image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Speaker Bio',
      type: 'text'
    },
    {
      name: 'company',
      title: 'Company',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{
        name: 'link',
        title: 'Link',
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string'},
          { name: 'url', title: 'URL', type: 'url'}
        ]
      }]
    },
    {
      name: 'talk',
      title: 'Talk',
      type: 'reference',
      to: [{type: 'talk'}]
    }
  ]
}
