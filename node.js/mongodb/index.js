import { MongoClient } from 'mongodb';


const uri = "mongodb+srv://csonglin0%40gmail.com:%40happy%2C.88@cluster0.cjjzp.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);

        console.log(movie);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);