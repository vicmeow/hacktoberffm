export default {
  name: 'talk',
  title: 'Talk',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Talk', value: 'talk'},
          {title: 'Lightning talk', value: 'lightning talk'},
          {title: 'Workshop', value: 'workshop'}
        ]
      }
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'German', value: 'de'},
          {title: 'English', value: 'en'}
        ]
      }
    },
    {
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{type: 'speaker'}]
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}
