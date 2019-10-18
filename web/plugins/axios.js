export default function({ $axios }) {
  $axios.onRequest(config => {
    if (process.env.GITHUB_TOKEN) {
      config.headers.common['Authorization'] = process.env.GITHUB_TOKEN
    }
  })
}
