export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'img',
      title: 'Profile image',
      type: 'image'
    },
    {
      name: 'company',
      title: 'Company/Organization',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'url', type: 'url', title: 'URL' }
      ]
    },
    {
      name: 'bio',
      title: 'Short bio',
      type: 'text',
      description: 'A short description of this person.'
    },
    {
      name: 'links',
      title: 'Related links',
      type: 'array',
      description: 'Links to social media accounts, personal websites etc.',
      of: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [{ name: 'url', title: 'URL', type: 'url' }]
        }
      ]
    }
  ]
}
