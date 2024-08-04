const { Diary } = require("../Models/diary_models");
const { cloudinary } = require("../utils/clodinary_upload");
const { client,createKey,datakeyId, encryptedDatabaseName,localMasterKey, encryptedCollectionName, encryption } = require("../utils/db-diary");
const mongodb=require('mongodb')
const Write = async (req, res) => {
  try {
    // Ensure client is connected before proceeding
    await client.connect();
    const db = client.db('encrypt_Diary'); 
    const encryptedCollection = db.collection('encrypt_DiariesC');
    const datakeyId = await createKey()
    let images = req.body.image;
    const result = await cloudinary.uploader.upload(images);
    const imagesBuffer = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    let user = new Diary({
      username: req.body.username,
      title: req.body.title,
      content: req.body.content,
      favourite: req.body.fav,
      date: req.body.date,
      image: imagesBuffer,
    });
    const encryptedData = await encryption.encrypt(
      JSON.stringify(user),
      { keyId: datakeyId,
        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
      }
    );
    await encryptedCollection.insertOne({username:req.body.username,encryptedData,datakeyId,date:req.body.date});
    res.json({ message: 'Document encrypted and inserted successfully' });
  } catch (err) {
    console.error("Error in Write function:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Media = async (req, res) => {
  try {
    await client.connect()
    const db = client.db(encryptedDatabaseName);
    const encryptedCollection = db.collection(encryptedCollectionName);
    const { username, day, month, year } = req.query;
    
    // Assuming encryptedCollection.find is an asynchronous operation
const users = await encryptedCollection.find({ username: username }).toArray(); // Ensure it returns an array
console.log(users);

const media = users
  .filter(user => {
    if (year === undefined) return true;
    if (month === undefined) return user.date.year === year;
    if (day === undefined) return user.date.year === year && user.date.month === month;
    return user.date.year === year && user.date.month === month && user.date.day === day;
  })
  .map(async user => {
    console.log(user);
    const encryptedData = user.encryptedData;
    const keyId = user.datakeyId;
     const  decryptedData = async ()=>{
      try{
      await encryption.decrypt(encryptedData, { keyId: keyId });
      }
      catch (error) {
        console.error('Decryption failed:', error);
        return null; // Skip this user if decryption fails
      }
    }
    console.log(decryptedData);
    let user1;
    try {
      user1 = JSON.parse(decryptedData.toString());
      console.log(user1);
    } catch (error) {
      console.error('Parsing JSON failed:', error);
      return null; // Skip this user if JSON parsing fails
    }

    return {
      url: user1.image.url,
      date: user1.date,
    };
  })
  .filter(media => media !== null); // Filter out any null values from failed operations

res.json({ media });
  } catch (err) {
    console.error("Error in Media function:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { Write, Media };
