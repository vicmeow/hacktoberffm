import S from "@sanity/desk-tool/structure-builder";
import React from 'react'
import sanityClient from 'part:@sanity/base/client'

const emoji = (emoji) => {
  return () => <span role="img" style={{fontSize: '2rem'}}>{emoji}</span>
}

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title('Website')
        .icon(emoji('💻'))
        .child(
          S.documentTypeList('page').title('Pages')
        ),
      S.divider(),
      S.listItem()
        .title('Speakers & Talks')
        .icon(emoji('📣'))
        .child(
          S.list()
            .title('Speakers & Talks')
            .items([
              S.listItem().title('Speakers').icon(emoji('🗣')).child(S.documentTypeList('speaker')),
              S.listItem().title('Talks').icon(emoji('🎤')).child(talkType =>
                S.documentTypeList('talk')
                .filter('_type == $type && type == $talkType')
                .params({ type: 'talk', talkType: 'talk' })
              ),
              S.listItem().title('Lightning talks').icon(emoji('⚡️')).child(talkType =>
                S.documentTypeList('talk')
                .filter('_type == $type && type == $talkType')
                .params({ type: 'talk', talkType: 'lightning talk' })
                
              )
            ])
        ),
        S.listItem()
        .title('Sponsors')
        .icon(emoji('💰'))
        .child(
          S.documentTypeList('sponsor').title('Sponsors')
        ),
      S.listItem()
        .title('Resources')
        .icon(emoji('📚'))
        .child(
          S.list()
            .title('Resources')
            .items([
              S.listItem()
                .title('Articles')
                .icon(emoji('📰'))
                .child(resource =>
                  S.documentTypeList('resource')
                    .title('Articles')
                    .filter('_type == $type && type == $resource')
                    .params({ type: 'resource', resource: 'article' })
                ),
              S.listItem()
                .title('Guides')
                .icon(emoji('📖'))
                .child(resource =>
                  S.documentTypeList('resource')
                    .title('Guides')
                    .filter('_type == $type && type == $resource')
                    .params({ type: 'resource', resource: 'guide' })
                ),
              S.listItem()
                .title('Projects')
                .icon(emoji('📓'))
                .child(resource =>
                  S.documentTypeList('resource')
                    .title('Projects')
                    .filter('_type == $type && type == $resource')
                    .params({ type: 'resource', resource: 'project' })
                ),
              S.listItem()
                .title('All resources')
                .icon(emoji('📚'))
                .child(
                  S.documentTypeList('resource')
                )
            ])
        ),
      S.listItem()
        .title('Comments')
        .icon(emoji('💬'))
        .child(
          S.documentTypeList('comment').title('Comments')
        ),
    ]);