
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

export async function run(page) {
	try {

		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find({}).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
}

export async function runCategories() {
	try {
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("categories");
		const data = await collection.find({}).toArray();
		const dataArray = data.map(document => document.categories);

		return dataArray;


	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}

}

export async function run2() {
	try {

		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("allergens");
		const data = await collection.find({}).toArray();
		const dataArray = data.map(document => document.allergens);

		return dataArray;


	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
}

export async function runFilter(page, filter) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find(filter).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}

}

export async function runFilter2(page, filter, sort) {

	try {

		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find(filter).sort(sort).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}

}

export async function runFav(page, sort) {
	try {
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("favourites");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find({}).sort(sort).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}

}

export async function insertFavOrHistory(collection, document) {
	try {

		const db = client.db("devdb");
		const result = await db.collection(collection).insertOne(document);

		return result;
	} catch (error) {
		console.error("Failed to connect to MongoDB To save favourites", error);
	}
}

export async function DeleteFav(recipe) {
	try {

		const db = client.db("devdb");
		const result = await db.collection("favourites").deleteOne(recipe);
		return console.log("deleted");
	} catch (error) {
		console.error("Failed to connect to MongoDB To save favourites", error);
	}
}


export async function runHistory() {
	try {
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("history");
		const data = await collection.find({}).toArray();

		return data;

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
}

export async function DeleteHistory() {
	try {

		const db = client.db("devdb");
		const result = await db.collection("history").deleteMany({});
		return console.log("deletedAllHistory");
	} catch (error) {
		console.error("Failed to connect to MongoDB To save favourites", error);
	}
}

export default async function runUpdateInstructions(recipeId, updatedInstruction) {
	const db = client.db('devdb');
	const collection = db.collection('recipes');

	try {

		await collection.updateOne(
			{ _id: recipeId },
			{
				$set: { "instructions": updatedInstruction },
			},
		);

		return { success: true, message: 'Instruction updated successfully' };
	} catch (error) {
		console.error('Database update error:', error);
		throw error;
	}
}

export async function runUpdateDescription(recipeId, updatedDescription) {
	const db = client.db('devdb');
	const collection = db.collection('recipes');

	try {

		await collection.updateOne(
			{ _id: recipeId },
			{
				$set: { "description": updatedDescription },
			},
		);

		return { success: true, message: 'Description updated successfully' };
	} catch (error) {
		console.error('Database update error:', error);
		throw error;
	}
}

export async function runNumberOfRecipes() {
	try {
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");
		const count = (await collection.countDocuments({})).toString();
		return Math.round(parseInt(count)/100);

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
}
