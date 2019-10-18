export const state = () => ({
  authUser: null,
  users: [],
  comments: [],
  isListeningUsers: false,
  isListeningChat: false
})

export const mutations = {
  SET_AUTH_USER(state, user) {
    state.chatUser = user
    console.log(user)
  },
  IS_LISTENING_USERS(state, status) {
    state.isListeningUsers = status
  },
  IS_LISTENING_CHAT(state, status) {
    state.isListeningChat = status
  },
  SET_LEADERBOARD_USERS(state, users) {
    state.users = users
  },
  SET_CHAT_COMMENTS(state, comments) {
    state.comments = comments
  },
  ADD_NEW_USER(state, user) {
    state.users.push(user)
  },
  REMOVE_USER(state, id) {
    state.users = state.users.filter(user => user._id !== id)
  },
  ADD_NEW_COMMENT(state, comment) {
    state.comments.push(comment)
  },
  REMOVE_COMMENT(state, id) {
    state.comments = state.comments.filter(comment => comment._id !== id)
  },
  SUCCESS() {
    console.log('success')
  }
}

export const actions = {
  login({ commit }) {
    commit('SUCCESS')
    this.$auth.loginWith('github')
  },
  setAuthUser({ commit }, user) {
    commit('SET_AUTH_USER', user)
  },
  startListener({ commit, dispatch }, type) {
    if (type === 'users') {
      commit('IS_LISTENING_USERS', true)
      dispatch('startUserListener')
    }
    if (type === 'chat') {
      commit('IS_LISTENING_CHAT', true)
      dispatch('startChatListener')
    }
  },
  startUserListener({ dispatch, state }) {
    const query = '*[_type == "user"]'
    return this.$sanity.listen(query).subscribe(result => {
      const type = result.transition
      if (type === 'appear') {
        // Only add if a user is added and oesn't already exist
        const newUser = result.result
        const newId = result.documentId
        // If new user ID does not match an ID already in array
        if (!state.users.find(user => user._id === newId)) {
          return dispatch('addNewUser', newUser)
        }
      }
      if (type === 'disappear') {
        const id = result.documentId
        // Remove deleted user from array
        return dispatch('removeUser', id)
      }
    })
  },
  startChatListener({ dispatch, state }) {
    const query = '*[_type == "comment"]'
    return this.$sanity.listen(query).subscribe(result => {
      const type = result.transition
      if (type === 'appear') {
        // Only add if a user is added and doesn't already exist
        const newComment = result.result
        const newId = result.documentId
        // If new user ID does not match an ID already in array
        if (!state.comments.find(comment => comment._id === newId)) {
          return dispatch('addNewComment', newComment)
        }
      }
      if (type === 'disappear') {
        const id = result.documentId
        // Remove deleted user from array
        return dispatch('removeComment', id)
      }
    })
  },
  addNewComment({ commit }, comment) {
    commit('ADD_NEW_COMMENT', comment)
  },
  removeComment({ commit }, id) {
    commit('REMOVE_COMMENT', id)
  },
  fetchUsers({ commit }) {
    const query = '*[_type == "user"]'
    this.$sanity
      .fetch(query)
      .then(result => {
        commit('SET_LEADERBOARD_USERS', result)
      })
      .catch(e => {
        console.log(e)
      })
  },
  fetchComments({ commit }) {
    const query = '*[_type == "comment"]  | order(_createdAt desc)[0...50]'
    this.$sanity
      .fetch(query)
      .then(result => {
        commit('SET_CHAT_COMMENTS', result.reverse())
      })
      .catch(e => {
        console.log(e)
      })
  },
  addNewUser({ commit }, user) {
    commit('ADD_NEW_USER', user)
  },
  removeUser({ commit }, id) {
    commit('REMOVE_USER', id)
  },
  updateUsers({ dispatch }) {
    dispatch('fetchUsers')
  },
  // STEP 1
  checkIfUserExists({ dispatch }, user) {
    const query = '*[_type == "user" && _id == $id]{_id}'
    const params = { id: `user-${user.id}` }
    this.$sanity
      .fetch(query, params)
      .then(result => {
        if (!result.length) {
          return dispatch('assembleUser', user)
        }
        console.log('user exists, stop.')
      })
      .catch(e => {
        console.log(e)
      })
  },
  // STEP 2
  assembleUser({ dispatch }, user) {
    const assembled = {
      _type: 'user',
      _id: `user-${user.id}`,
      name: user.login,
      github_id: user.id,
      avatar_url: user.avatar_url,
      profile_url: user.html_url
    }
    return dispatch('fetchGithubData', assembled)
  },
  // STEP 3
  async fetchGithubData({ dispatch }, user) {
    // Fetch GitHub Data
    const buildQuery = (username, searchYear) =>
      `-label:invalid+created:${searchYear}-09-30T00:00:00-12:00..${searchYear}-10-31T23:59:59-12:00+type:pr+is:public+author:${username}`

    try {
      const userData = await this.$axios
        .$get(
          `https://api.github.com/search/issues?q=${buildQuery(
            user.name,
            2019
          )}`
        )
        // Get details we want about the user and their PRs
        .then(res => {
          const result = res.items
          // Same structure as in Sanity schema
          const details = {
            pr_count: res.total_count,
            latest_pr: {
              title: result[0].title,
              url: result[0].html_url,
              timestamp: result[0].created_at
            }
          }
          return details
        })
      // Create user in Sanity
      return dispatch('createUserDoc', { ...user, ...userData })
    } catch (error) {
      console.log(error)
    }
  },
  // STEP 4
  createUserDoc({ commit }, user) {
    this.$sanity
      .create(user)
      .then(result => {
        console.log('created', result._id)
        commit('SUCCESS')
      })
      .catch(e => {
        console.log(e)
      })
  }
}
