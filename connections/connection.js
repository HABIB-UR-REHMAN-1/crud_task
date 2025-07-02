const mongose = require("mongoose");


exports.connectToDatabase = async () => {
    // Connect to MongoDB using Mongoose
    mongose.connect("mongodb+srv://Habib:habib1234@shantu.ckyz0tc.mongodb.net/?retryWrites=true&w=majority&appName=Shantu", {
        dbName: "user",                   
    }).then((conn) => {         
        console.log("Connected to MongoDB successfully", `${conn.connection.host}`);
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    }); 
};

