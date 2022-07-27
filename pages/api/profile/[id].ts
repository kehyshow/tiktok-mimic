// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const user = await client.fetch(singleUserQuery(id as string));
    const userVideos = await client.fetch(userCreatedPostsQuery(id as string));
    const userLikedVideos = await client.fetch(userLikedPostsQuery(id as string));

    res.status(200).json({ user: user[0], userVideos, userLikedVideos });
  }
}
