import { MongoClient, ServerApiVersion } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://test:test@cluster0.lgrecah.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;