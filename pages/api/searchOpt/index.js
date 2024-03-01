import { runFilter } from "@/fetching-data/data";

async function handler(req, res) {
    const searchChar = req.query.filter;
    console.log(searchChar)
    if (req.method === 'GET') {
        try {
            const recipes = await runFilter(1, {title: {$regex: searchChar, $options: 'i' }})
            res.status(200).json({ recipe: recipes });
        } catch (error) {
            res.status(500).json({ message: 'Getting recipes failed' });
        }
    }
}

export default handler;