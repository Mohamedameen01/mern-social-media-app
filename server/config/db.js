import { MongoClient } from 'mongodb'

const state = { db:null }

export const connect = (done) => {
    const url = process.env.MONGO_URL;
    MongoClient.connect(url).then(data => {
        state.db = data.db("Memories")
        done()
    }).catch(error => {
        done(error);
    })
}

export const get = () => state.db
