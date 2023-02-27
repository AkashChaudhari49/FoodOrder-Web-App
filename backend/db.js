const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const mongodbConnection = async () => {
    await mongoose.connect('mongodb://127.0.0.1/food-delivery', async (err, result) => {
        if (err) console.log(err)
        else {
            console.log("connected successfully");
            const fetch_data = await mongoose.connection.db.collection("food-data");
            fetch_data.find({}).toArray(async function (err, data) {

                const foodCategory = await mongoose.connection.db.collection("food-category");

                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
                // if (err) console.log(err);
                // else {
                //     global.food_items = data;
                //     console.log(global.food_items);
                // }
            })
        }
    })
}

module.exports = mongodbConnection;
