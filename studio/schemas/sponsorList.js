export default {
  type: 'document',
  title: 'Sponsor list',
  name: 'sponsorList',
  fields: [
    {
      name: 'sponsors',
      title: 'sponsors',
      type: 'array',
      of: [{type: 'reference', to: [{ type: 'sponsor' }]}]
    }
  ]
}