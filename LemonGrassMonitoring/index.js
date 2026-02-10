const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.autoSaveToFirestore = functions.database.ref('/sensor')
    .onUpdate(async (change, context) => {
        const newData = change.after.val();
        const dateString = new Date().toISOString().split('T')[0];
        
        // Invert Logic: Backend ON -> Frontend OFF
        const displayMist = (newData.mist === "ON") ? "OFF" : "ON";

        return admin.firestore().collection('logs').add({
            gas: newData.gas,
            water: newData.water,
            mist: displayMist,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            dateString: dateString 
        });
    });