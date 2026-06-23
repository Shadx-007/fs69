const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'student';
const collectionName = 'studentnames';

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
}

async function insertStudent(student) {
    const db = client.db(dbName);
    const result = await db.collection(collectionName).insertOne(student);
    console.log("Inserted ID:", result.insertedId);
    return result.insertedId;
}

async function findStudents() {
    const db = client.db(dbName);
    const students = await db.collection(collectionName).find({}).toArray();
    console.log("Students:");
    console.log(students);
}

async function updateStudent(id) {
    const db = client.db(dbName);
    await db.collection(collectionName).updateOne(
        { _id: new ObjectId(id) },
        { $set: { Dept: "CSE" } }
    );
    console.log("Student Updated");
}

async function deleteStudent(id) {
    const db = client.db(dbName);
    await db.collection(collectionName).deleteOne(
        { _id: new ObjectId(id) }
    );
    console.log("Student Deleted");
}

async function main() {
    await connectDB();

    const student = {
        name: "Monisha",
        age: 18,
        cgpa: 6.38,
        Dept: "ISE"
    };

    const insertedId = await insertStudent(student);
    await findStudents();
    await updateStudent(insertedId);
    await findStudents();
    await deleteStudent(insertedId);
    await findStudents();

    await client.close();
}

main();