import React from "react"

export default {
  title: "User",
  name: "user",
  type: "document",
  readOnly: true,
  fields: [
    {
      name: "github_id",
      title: "GitHub ID",
      type: "number",
      hidden: true
    },
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Avatar URL",
      name: "avatar_url",
      type: "url"
    },
    {
      title: "Profile URL",
      name: "profile_url",
      type: "url"
    },
    {
      title: "PR count",
      name: "pr_count",
      type: "number"
    },
    {
      title: "Latest PR",
      name: "latest_pr",
      type: "object",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string"
        },
        {
          title: "Timestamp",
          name: "timestamp",
          type: "string"
        },
        {
          title: "Pull Request URL",
          name: "url",
          type: "url"
        }
      ]
    },
    {
      title: "comments",
      name: "comments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "comment" }] }]
    }
  ]
}
