import { runFilter } from "@/fetching-data/data";

export default async function handler(req, res) {
  try {
    const { ingredient } = req.query;

    if (ingredient) {
      try {
        const filter = JSON.parse(ingredient);
        const filteredData = await runFilter(1, filter);

        res.status(200).json(filteredData);
      } catch (error) {
        console.error('Error parsing ingredient JSON:', error);
        res.status(400).json({ message: "Invalid ingredient parameter." });
      }
    } else {
      res.status(400).json({ message: "Invalid request. Please provide ingredient parameter." });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

  