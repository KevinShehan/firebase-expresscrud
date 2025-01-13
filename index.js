const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require('firebase/firestore');
const app = express();
app.use(express.json());
require('dotenv').config();


//server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});;


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeV3N4mwB4xIhPh6_36Bj_JlAhfOYqiPc",
    authDomain: "firekevin-c000c.firebaseapp.com",
    projectId: "firekevin-c000c",
    storageBucket: "firekevin-c000c.firebasestorage.app",
    messagingSenderId: "366265188859",
    appId: "1:366265188859:web:098ff2b83da46c16c20b5e"
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);
const db = getFirestore(fireapp);

// Firestore collection reference
const collectionName = 'items'; 


app.get('/items', async(req, res) => {
    try{
        const docs = await getDocs(collection(db, collectionName));
        res.json(docs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});
app.post('/items', async(req, res) => {
    try{
        const docRef = await addDoc(collection(db, collectionName), req.body);
        res.status(201).json({ id: docRef.id, message: 'Created successfully!' });
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});
app.put('/items/:id', async(req, res) => {
    try{
        const docRef = doc(db, collectionName, req.params.id);
        await updateDoc(docRef, req.body);
        res.json({ message: 'Updated successfully!' });
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
});
app.delete('/items/:id', async(req, res) => {
    try{
        await deleteDoc(doc(db, collectionName, req.params.id));
        res.json({ message: 'Deleted successfully!' });
    }
    catch(e){
        console.log(e);
        res.status(500).json({message:e.message});
    }
});