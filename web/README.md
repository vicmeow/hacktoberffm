# hacktoberffm

> Hacktoberfest Frankfurt

## Wow, so much to do to get this app working, right

LOGIN IS BROKEN. TO FIX:

To set up locally and to get a higher request limit, create your own [GitHub Oauth application](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/), and replace the values below, with your own token value in `axios.js`:

```
config.headers.common['Authorization'] = 'YOUR TOKEN'
```

You also need to add the auth callback URL with this value: `https://localhost:3000/leaderboard`.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
