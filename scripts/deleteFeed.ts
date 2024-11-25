import dotenv from 'dotenv'
import { AtpAgent } from '@atproto/api'

dotenv.config()

const FEED_RECORD_NAME = 'mmt-feed' // Short name of the feed you want to delete

const deleteFeed = async (): Promise<void> => {
  if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
    throw new Error('Missing BlueSky credentials in environment variables.')
  }

  const handle = process.env.BLUESKY_USERNAME as string
  const password = process.env.BLUESKY_PASSWORD as string

  const agent = new AtpAgent({ service: 'https://bsky.social' })
  await agent.login({ identifier: handle, password })

  try {
    await agent.api.com.atproto.repo.deleteRecord({
      repo: agent.session?.did ?? '',
      collection: 'app.bsky.feed.generator',
      rkey: FEED_RECORD_NAME,
    })
    console.log(`Feed '${FEED_RECORD_NAME}' successfully deleted.`)
  } catch (err) {
    console.error('Error during feed deletion:', err.message || err)
  }
}

deleteFeed().catch((err) => {
  console.error('Unexpected error:', err.message || err)
})
