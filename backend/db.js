const mongo = require('mongoose')
const mongoUri = 'mongodb+srv://admin:admin@cluster0.f6b0c.mongodb.net/FoodApp?retryWrites=true&w=majority&appName=Cluster0'

const mongoConnect = async () => {
    try {
        const connect = await mongo.connect(mongoUri);
        console.log(
            "Database connected",
            connect.connection.host,
            connect.connection.name
        );

        readdata();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}


async function readdata(params) {
    try {
        const fetched_data = await mongo.connection.db.collection("FoodItems");        
        const data = await fetched_data.find({}).toArray();

        const foodcategory = await mongo.connection.db.collection("FoodCategory");
        const foodcategorydata = await foodcategory.find({}).toArray();
        //console.log(data)
        global.fooditems=data
        global.foodcategory=foodcategorydata
       // console.log(foodcategorydata);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = mongoConnect