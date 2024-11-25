import { generateMMTFeed } from '../src/algos/mmt'

test('Generate MMT feed', async () => {
  const feed = await generateMMTFeed()
  expect(feed.length).toBeGreaterThan(0)
})
