const { Diary } = require("../Models/diary_models");
const { cloudinary } = require("../utils/clodinary_upload");
const { client, createKey, encryption } = require("../utils/db-diary");

const Write = async (req, res) => {
  try {
    await client.connect();
    const db = client.db('diary');
    const encryptedCollection = db.collection('encrypt_DiariesC');
    const datakeyId = await createKey();

    const images = req.body.image;
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

    console.log(`Attempting to encrypt data with datakeyId: ${datakeyId}`);
    const encryptedData = await encryption.encrypt(
      JSON.stringify(user),
      {
        keyId: datakeyId,
        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
      }
    );
    console.log('Encryption successful.');

    await encryptedCollection.insertOne({
      username: req.body.username,
      encryptedData,
      datakeyId,
      date: req.body.date
    });
    console.log(encryptedData);
    res.json({ message: 'Document encrypted and inserted successfully' });
  } catch (err) {
    console.error("Error in Write function:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

const Media = async (req, res) => {
  try {
    await client.connect();
    const db = client.db('diary');
    const encryptedCollection = db.collection('encrypt_DiariesC');
    const { username, day, month, year } = req.query;

    console.log(req.query);
    const users = await encryptedCollection.find({ username }).toArray();

    const media = await Promise.all(users
      .filter(user => {
        if (year === undefined) return true;
        if (month === undefined) return user.date.year === year;
        if (day === undefined) return user.date.year === year && user.date.month === month;
        return user.date.year == year && user.date.month == month && user.date.day == day;
      })
      .map(async (user) => {
        console.log(user);
        try {
          console.log(`Attempting to decrypt data with datakeyId: ${user.datakeyId}`);
          const decryptedData = await encryption.decrypt(user.encryptedData, {
            keyId: user.datakeyId,
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
          });
          console.log(`Decryption successful for datakeyId: ${user.datakeyId}`);
          console.log(user.encryptedData)
          const parsedData = JSON.parse(decryptedData);
          console.log(parsedData);
          return {

            url: parsedData.image.url,
            date: parsedData.date,
          };
        } catch (error) {
          console.error(`Error decrypting data for datakeyId: ${user.datakeyId}`, error);
          console.error(`Encrypted data: ${user}`);
          return null; // Skip this user if decryption fails
        }
      })
    );

    res.json({ media: media.filter(item => item !== null) });
  } catch (err) {
    console.error("Error in Media function:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } 
  //finally {
  //   await client.close();
  // }
};


module.exports = { Write, Media };
