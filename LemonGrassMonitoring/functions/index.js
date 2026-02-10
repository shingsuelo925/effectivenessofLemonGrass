const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.autoSaveToFirestore = functions.database.ref('/sensor')
    .onUpdate(async (change, context) => {
        const newData = change.after.val();
        const dateString = new Date().toISOString().split('T')[0];
        
        // Invert Logic for Dashboard display
        const displayMist = (newData.mist === "ON") ? "OFF" : "ON";

        console.log("Saving to Firestore...");

        return admin.firestore().collection('logs').add({
            gas: newData.gas,
            water: newData.water,
            mist: displayMist,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            dateString: dateString 
        });
    });