export default {
  type: 'object', 
  title: 'List', 
  name: 'list',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    { 
      type: 'array',
      name: 'item',
      title: 'Item',
      of: [
        { 
          type: 'reference', 
          to: [
            { type: 'sponsor' }, 
            { type: 'speaker' }, 
            { type: 'talk' }
          ]
        }
      ]
    }
  ]
}