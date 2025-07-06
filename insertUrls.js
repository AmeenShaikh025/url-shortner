const { MongoClient } = require('mongodb');

// MongoDB connection URL
const uri = "mongodb://localhost:27017";

// Database and collection names
const dbName = "URL";
const collectionName = "url_shortener";

// Auto-incrementing counter function
async function getNextSequence(db, name) {
    const result = await db.collection("counters").findOneAndUpdate(
        { _id: name },
        { $inc: { sequence_value: 1 } },
        { upsert: true, returnDocument: "after" }
    );
    return result.value.sequence_value;
}

// Function to generate random short codes
function generateShortCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Ensure short_code is unique
        await collection.createIndex({ short_code: 1 }, { unique: true });

        // Insert 1000 records
        const docs = [];

        for (let i = 0; i < 1000; i++) {
            // const id = await getNextSequence(db, "url_id");
            const original_url = `https://example.com/page/${i}`;
            const short_code = generateShortCode();
            const created_at = new Date();

            docs.push({ original_url, short_code, created_at });
        }

        const result = await collection.insertMany(docs);
        console.log(`Inserted ${result.insertedCount} documents.`);
    } catch (err) {
        console.error("Error inserting documents:", err.message);
    } finally {
        /* Finding size of the table or collection */
        
        // const stats = db.urls.stats();
        // print("Size (MB):", (stats.size / (1024 * 1024)).toFixed(2));
        // print("Storage Size (MB):", (stats.storageSize / (1024 * 1024)).toFixed(2));
        // print("Document Count:", stats.count);
        await client.close();
    }
}

main();
