import { insertFavOrHistory, DeleteHistory} from "@/fetching-data/data";

async function handler(req, res) {
const searchHistory = req.body

    if (req.method === 'POST') {
        try {
            const recipes = await insertFavOrHistory('history', searchHistory);
            res.status(200).json({ message: 'Added to history!', recipes: searchHistory});
        } catch (error) {
            res.status(500).json({ message: 'Inserting to history failed!' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const recipes = await DeleteHistory();
            res.status(200).json({recipes: searchHistory});
        } catch (error) {
            res.status(500).json({ message: 'Deleting from history failed!' });
        }
    }

}

export default handler;
