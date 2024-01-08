import { NextApiRequest, NextApiResponse } from 'next';

import bookData from '@/data/book.json';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        res.status(200).json(bookData);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}