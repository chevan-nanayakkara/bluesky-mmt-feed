import { fetchMMTPosts } from '../util/db'

/**
 * Generate a feed of posts related to Modern Monetary Theory (MMT).
 */
export const generateMMTFeed = async () => {
  const posts = await fetchMMTPosts()
  return posts.map((post) => ({
    post: post.uri,
    reason: { $type: 'app.bsky.feed.defs#skeletonReasonRepost', repost: post.uri },
  }))
}
