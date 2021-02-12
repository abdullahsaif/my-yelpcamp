const path = require("path");
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60190204ce16bd217c746aa5",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, neque necessitatibus? Dignissimos sunt hic laudantium? Obcaecati soluta nulla, in at unde quaerat ut sit sint, repudiandae, quos molestias. Tempore.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[rand1000].longitude,
          cities[rand1000].latitude
        ]
      },
      images: [
        {

          url: 'https://res.cloudinary.com/dmxezvcx8/image/upload/v1612730442/YelpCamp/qeaajwyxuyqzyh0iz61a.jpg',
          filename: 'YelpCamp/qeaajwyxuyqzyh0iz61a'
        },
        {
          url: 'https://res.cloudinary.com/dmxezvcx8/image/upload/v1612730442/YelpCamp/ojxwbvrwk3hnnncukeqs.jpg',
          filename: 'YelpCamp/ojxwbvrwk3hnnncukeqs'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
