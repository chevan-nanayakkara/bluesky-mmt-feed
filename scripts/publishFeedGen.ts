import dotenv from 'dotenv'
import { AtpAgent, BlobRef } from '@atproto/api'
import fs from 'fs/promises'
import { ids } from '../src/lexicon/lexicons'

dotenv.config()

// User-specified feed data
const FEED_RECORD_NAME: string = 'mmt-feed' // Short name for the feed (used in URL)
const FEED_DISPLAY_NAME: string = 'MMT Discussions' // Display name of the feed
const FEED_DESCRIPTION: string = 'A curated feed for discussions about Modern Monetary Theory' // Description of the feed
const FEED_AVATAR: string = '' // Optional: Path to an avatar file (e.g., './avatar.png'). Leave empty if not using an avatar.
const FEED_SERVICE: string = 'https://bsky.social' // Optional: Custom PDS service (default is bsky.social)

// Validate user-specified data
const validateInputs = (): void => {
  if (!FEED_RECORD_NAME) {
    throw new Error('FEED_RECORD_NAME is required. Please specify a short name for the feed.')
  }
  if (!FEED_DISPLAY_NAME) {
    throw new Error('FEED_DISPLAY_NAME is required. Please specify a display name for the feed.')
  }
  if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
    throw new Error(
      'Missing BlueSky credentials. Ensure BLUESKY_USERNAME and BLUESKY_PASSWORD are set in your environment.',
    )
  }
  if (FEED_AVATAR && typeof FEED_AVATAR !== 'string') {
    throw new Error('FEED_AVATAR must be a string representing a valid file path or an empty string.')
  }
}

const run = async (): Promise<void> => {
  try {
    validateInputs()

    const handle = process.env.BLUESKY_USERNAME as string
    const password = process.env.BLUESKY_PASSWORD as string

    const feedGenDid = process.env.FEEDGEN_SERVICE_DID
      ? process.env.FEEDGEN_SERVICE_DID
      : `did:web:${process.env.FEEDGEN_HOSTNAME}`

    // Authenticate using BlueSky credentials
    const agent = new AtpAgent({ service: FEED_SERVICE })
    await agent.login({ identifier: handle, password })

    let avatarRef: BlobRef | undefined
    if (FEED_AVATAR) {
      let encoding: string
      if (FEED_AVATAR.endsWith('.png')) {
        encoding = 'image/png'
      } else if (FEED_AVATAR.endsWith('.jpg') || FEED_AVATAR.endsWith('.jpeg')) {
        encoding = 'image/jpeg'
      } else {
        throw new Error('Expected PNG or JPEG for avatar.')
      }
      try {
        const img = await fs.readFile(FEED_AVATAR)
        const blobRes = await agent.api.com.atproto.repo.uploadBlob(img, {
          encoding,
        })
        avatarRef = blobRes.data.blob
      } catch (err) {
        throw new Error(`Error reading avatar file: ${err.message}`)
      }
    }

    await agent.api.com.atproto.repo.putRecord({
      repo: agent.session?.did ?? '',
      collection: ids.AppBskyFeedGenerator,
      rkey: FEED_RECORD_NAME,
      record: {
        did: feedGenDid,
        displayName: FEED_DISPLAY_NAME,
        description: FEED_DESCRIPTION,
        avatar: avatarRef,
        createdAt: new Date().toISOString(),
      },
    })

    console.log('Feed successfully published! 🎉')
  } catch (err) {
    if (err.response?.status === 401) {
      console.error('Error: Authentication failed. Please check your BlueSky credentials.')
    } else if (err.code === 'ENOENT') {
      console.error('Error: Avatar file not found. Please check the file path specified in FEED_AVATAR.')
    } else if (err.message.includes('Expected PNG or JPEG')) {
      console.error(err.message)
    } else {
      console.error('Error during feed publishing:', err.message || err)
    }
  }
}

run()
