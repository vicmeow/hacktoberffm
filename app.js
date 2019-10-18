const app = require("express")()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const axios = require("axios")
const env = require("dotenv").config()
const sanityClient = require("@sanity/client")

// GitHub API calls config
axios.defaults.baseURL = "https://api.github.com/"
axios.defaults.headers.common["Authentication"] = process.env.GITHUB_TOKEN

// Sanity Client config
const client = sanityClient({
  projectId: "eu51wv3p",
  dataset: "prod",
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

http.listen(3002, function() {
  console.log("listening on *:3002")
})

// Updating the frontend is handled by the client app using Sanity listeners

let interval
// Query to fetch users
const query = '*[_type == "user"]{"id": _id, name }'
const listenQuery = '*[_type == "user"]'
// Array for our existing users
const users = []

io.on("connection", function(socket) {
  // 1. Connect to client
  console.log("a client connected")

  // 2. Fetch list of users (name, id)
  client.fetch(query).then(result => {
    result.forEach(user => users.push(user))
  })

  // 3. Listen for new users, add new user to array to track their progress (name, id)
  const subscription = client.listen(query).subscribe(res => {
    const type = res.transition
    const id = res.documentId
    // If user is added
    if (type === "appear") {
      const user = res.result
      const newUser = { id: user._id, name: user.name }
      users.push(newUser)
    }
    // if user is removed
    if (type === "disappear") {
      console.log("delete from array")
    }
  })

  // Interval to check for new PRs, every 5 minutes
  // const intervalMinutes = 1000 * 60 * 10
  const intervalMinutes = 3000
  // Reset interval if one is running
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => {
    // Every intervalMinutes, loop through users and fetch new data
    users.forEach(user => {
      console.log(user)
      getLatestPrs(user).then(result => {
        // Update Sanity with new info using a patch
        // console.log(result)
        // updateUser(result.id, result.patch)
      })
    })
    // let client know to check for update
    socket.emit("updateUsers")
  }, intervalMinutes)
  socket.on("disconnect", () => console.log("client disconnected"))
})

const getLatestPrs = async user => {
  const id = user.id
  const buildQuery = (user, searchYear) =>
    `-label:invalid+created:${searchYear}-09-30T00:00:00-12:00..${searchYear}-10-31T23:59:59-12:00+type:pr+is:public+author:${user}`

  try {
    const data = await axios
      .get(`/search/issues?q=${buildQuery(user.name, 2019)}`, {
        auth: {
          username: process.env.GITHUB_ID,
          password: process.env.GITHUB_TOKEN
        }
      })
      .then(res => {
        const result = res.data.items
        console.log(result)
        // Get details we want about the user and their PRs
        // const patch = {
        //   pr_count: res.data.total_count, // total amount of PRs
        //   latest_pr: {
        //     title: result[0].title, // latest PR title
        //     url: result[0].html_url, // latest PR link
        //     timestamp: result[0].created_at // latest PR creation
        //   }
        // }
        return { id, patch }
      })
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async data => {
  // Patch sanity docs here
  const { id, patch } = data
  client
    .patch(id)
    .set({ name: "LATEST UPDATE" })
    .commit()
    .then(updatedUser => {
      console.log("Updated:", id)
    })
}
