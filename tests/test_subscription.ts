import { FirehoseSubscription } from '../src/subscription'

test('Filter MMT posts', async () => {
  const subscription = new FirehoseSubscription()
  const fakeEvent = {
    record: { text: 'Modern Monetary Theory is great!', author: 'user1', createdAt: new Date().toISOString() },
  }
  await subscription.handleEvent(fakeEvent)
  // Verify the post was saved to the database
})
