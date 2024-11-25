// src/subscription.ts

import { OutputSchema as RepoEvent, isCommit } from './lexicon/types/com/atproto/sync/subscribeRepos'
import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'
import { authenticate } from './auth'
import { savePostToDatabase } from './util/db'

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return

    const agent = await authenticate() // Authenticate with BlueSky
    const ops = await getOpsByType(evt)

    for (const post of ops.posts.creates) {
      const text = post.record.text.toLowerCase()

      // Filter posts for Modern Monetary Theory (MMT)
      if (text.includes('modern monetary theory') || text.includes('mmt')) {
        console.log('MMT-related post found:', text)

        // Save the post to the database
        await savePostToDatabase({
          uri: post.uri,
          content: post.record.text,
          author: post.record.author,
          timestamp: post.record.createdAt,
        })
      }
    }
  }
}
