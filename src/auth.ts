import { BskyAgent } from '@atproto/api'

let agent: BskyAgent | null = null

/**
 * Authenticate with BlueSky using credentials from environment variables.
 * Reuse the agent for subsequent requests.
 */
export const authenticate = async (): Promise<BskyAgent> => {
  if (agent) {
    return agent // Reuse existing agent if already authenticated
  }

  // Fetch credentials from environment variables
  const username = process.env.BLUESKY_USERNAME
  const password = process.env.BLUESKY_PASSWORD

  if (!username || !password) {
    throw new Error('Missing BlueSky credentials. Ensure BLUESKY_USERNAME and BLUESKY_PASSWORD are set in secrets.')
  }

  // Initialize and authenticate the BlueSky agent
  agent = new BskyAgent({ service: 'https://bsky.social' })
  await agent.login({ identifier: username, password })
  console.log('Authenticated successfully with BlueSky.')
  return agent
}
