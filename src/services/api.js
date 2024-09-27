import * as Realm from "realm-web";

// Initialisation de l'application Realm avec l'ID de ton application Realm
const app = new Realm.App({ id: "secret-santa-ohkptxv" });

// Fonction pour se connecter anonymement
const loginAnonymous = async () => {
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  return user;
};

export const addUser = async (user) => {
  const credentials = Realm.Credentials.anonymous();
  try {
    const userAuth = await app.logIn(credentials);
    const mongo = userAuth.mongoClient("mongodb-atlas");
    const usersCollection = mongo.db("Secret-Santa").collection("users");
    
    await usersCollection.insertOne(user);  // Insérer l'utilisateur
  } catch (error) {
    console.error("Failed to add user:", error);
  }
};

export const getUsers = async () => {
  const credentials = Realm.Credentials.anonymous();
  try {
    const userAuth = await app.logIn(credentials);
    const mongo = userAuth.mongoClient("mongodb-atlas");
    const usersCollection = mongo.db("Secret-Santa").collection("users");
    
    const users = await usersCollection.find();  // Récupérer tous les utilisateurs
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;  // Rejeter l'erreur pour la gérer dans UserList
  }
};

// Récupère les suggestions de cadeaux pour un utilisateur donné
export const getGiftSuggestions = async (userId) => {
  const credentials = Realm.Credentials.anonymous();
  try {
    const userAuth = await app.logIn(credentials);
    const mongo = userAuth.mongoClient("mongodb-atlas");
    const suggestionsCollection = mongo.db("Secret-Santa").collection("suggestions");
    
    // Récupérer les suggestions pour l'utilisateur spécifié
    const suggestions = await suggestionsCollection.find({ userId: userId }); 
    return suggestions;
  } catch (error) {
    console.error("Failed to fetch gift suggestions:", error);
    throw error;  // Rejeter l'erreur pour la gérer dans GiftSuggestions
  }
};

// Ajoute une nouvelle suggestion de cadeau
export const addSuggestion = async (suggestion) => {
  const user = await loginAnonymous();
  const mongo = user.mongoClient("mongodb-atlas");
  const collection = mongo.db("Secret-Santa").collection("suggestions");
  return await collection.insertOne(suggestion);
};
