const sanityClient = require('@sanity/client')
export default sanityClient({
  projectId: 'eu51wv3p',
  dataset: 'prod',
  useCdn: true
})
