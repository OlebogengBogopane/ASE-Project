import { insertFavOrHistory, DeleteFav} from "@/fetching-data/data";

async function handler(req, res) {
const FavRecipe = req.body
// const recipeID = req.query.filterByid;


    if (req.method === 'POST') {
        try {
            const recipes = await insertFavOrHistory('favourites', FavRecipe);
            res.status(200).json({ message: 'Added to Favourites!', recipes: FavRecipe});
        } catch (error) {
            res.status(500).json({ message: 'Inserting to Favourites failed!' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const recipes = await DeleteFav(FavRecipe);
            res.status(200).json({ recipes: recipes});
        } catch (error) {
            res.status(500).json({ message: 'Deleting from Favourites failed!' });
        }
    }
}

export default handler;
