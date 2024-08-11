const mongoose =require("mongoose");
const { MongoClient, ClientEncryption } = require('mongodb');
const crypto = require('crypto');

// MongoDB URIs
const uri_diary = "mongodb+srv://sreeramangina:Df05rk9DBS6BrJOY@cluster0.ms09c2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Encryption setup
const kmsProviderName = "local";
const localMasterKey = crypto.randomBytes(96);
const keyVaultDatabaseName = "encryption";
const keyVaultCollectionName = "__keyVault";
const keyVaultNamespace = `${keyVaultDatabaseName}.${keyVaultCollectionName}`;
const encryptedDatabaseName = "encrypt_Diary";
const encryptedCollectionName = "encrypt_DiariesC";
const client = new MongoClient(uri_diary, {
});

const encryption = new ClientEncryption(client, {
  keyVaultNamespace,
  kmsProviders: {
    local: {
      key: localMasterKey
    }
  }
});
const createKey = async () => {
  try {
    const key = await encryption.createDataKey('local', { localMasterKey });
    console.log('Encryption Key Created:', key);
    return key; // Return key ID
  } catch (err) {
    console.error("Error creating encryption key:", err);
  }
};
const connectDB_diary = async () => {
  try {
    await client.connect();
    console.log("Connected to diary database");
  } catch (err) {
    console.error("Error connecting to diary database:", err);
  }
};

module.exports = { connectDB_diary,client,createKey, encryption,localMasterKey, encryptedDatabaseName, encryptedCollectionName };
