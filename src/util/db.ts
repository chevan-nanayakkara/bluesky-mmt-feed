import { db } from '../db'

export const savePostToDatabase = async ({ uri, content, author, timestamp }) => {
  await db.insertInto('post').values({ uri, content, author, indexedAt: timestamp }).execute()
}

export const fetchMMTPosts = async () => {
  return db.selectFrom('post').selectAll().where('content', 'like', '%mmt%').orderBy('indexedAt', 'desc').limit(20).execute()
}
