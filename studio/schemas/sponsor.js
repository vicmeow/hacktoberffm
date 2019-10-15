export default {
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image'
    },
    {
      name: 'url',
      title: 'Link',
      type: 'url'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
