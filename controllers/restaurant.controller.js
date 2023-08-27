const Restaurant = require("../models/restaurant.model");
const restaurantRoute = require("../routes/restaurant.route");
const objectConverter = require("../utils/object.converter");

//Adding new Restaurant API

module.exports.add = async (req, res) => {
  const restaurantObj = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    imageURL: req.body.imageURL,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  };
  try {
    const isEmpty = Object.keys(req.body).length;
    if (!isEmpty) {
      res.status(200).send({
        message: "Content cannot be empty",
      });
    } else {
      const restaurantCreated = await Restaurant.create(restaurantObj);
      const postResponse = {
        name: restaurantCreated.name,
        description: restaurantCreated.description,
        category: restaurantCreated.category,
        imageURL: restaurantCreated.imageURL,
        location: restaurantCreated.location,
        phone: restaurantCreated.phone,
        rating: restaurantCreated.rating,
        createdAt: restaurantCreated.createdAt,
        updatedAt: restaurantCreated.updatedAt,
      };
      res.status(200).send(postResponse);
    }
  } catch (err) {
    console.log(`Error while adding restaurant ${err}`);
    res.status(500).send({
      message: "Some error occurred while creating the Restaurant",
    });
  }
};

//API to fetch all the restaurants listed in App
module.exports.findAllRestaurant = async (req, res) => {
  try {
    const queryObj = {};

    const restaurants = await Restaurant.find(queryObj);
    //getting info from object converter and storing in a variable
    const response = {
      restaurants: objectConverter.restaurantResponse(restaurants),
      message: `Restaurants fetched successfully`,
    };

    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurants.",
    });
  }
};

//Find restaurant categories
module.exports.getCategory = async (req, res) => {
  try {
    const response = await Restaurant.distinct("category");
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching Categories",
    });
  }
};
//Find restaurants based on category(Takeout/Dineout)
module.exports.getCategoryName = async (req, res) => {
  try {
    //checking restaurant categories
    const category = await Restaurant.find({
      category: req.params.categoryName,
    });
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant.",
    });
  }
};

//Find restaurant based on MongoDB ID
module.exports.getRestaurantByID = async (req, res) => {
  try {
    //finding restaurant based on ID
    const id = await Restaurant.findById(req.params.id);
    res.status(200).send(id);
  } catch (err) {
    res.status(404).send({
      message: "No Restaurant found with the given ID",
    });
  }
};

//Find restaurant based on ratings
module.exports.getRestaurantByRating = async (req, res) => {
  try {
    const ratingValue = req.params.ratingValue;
    //finding all the restaurants with rating greater than or equal to rating passed
    const response = await Restaurant.find({
      rating: { $gte: ratingValue },
    }).exec();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant",
    });
  }
};

//Update existing restaurant information
module.exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const isEmpty = Object.keys(req.body).length;

    if (!isEmpty) {
      return res.status(400).send({ message: "Restaurant Data is required." });
    }

    restaurant.name =
      req.body.name != undefined ? req.body.name : restaurant.name;
    restaurant.description =
      req.body.description != undefined
        ? req.body.description
        : restaurant.description;
    restaurant.category =
      req.body.category != undefined ? req.body.category : restaurant.category;
    restaurant.imageURL =
      req.body.imageURL != undefined ? req.body.imageURL : restaurant.imageURL;
    restaurant.location =
      req.body.location != undefined ? req.body.location : restaurant.location;
    restaurant.phone =
      req.body.phone != undefined ? req.body.phone : restaurant.phone;
    restaurant.rating =
      req.body.rating != undefined ? req.body.rating : restaurant.rating;

    await restaurant.save();

    return res
      .status(200)
      .send({ message: "Restaurant updated successfully." });
  } catch (err) {
    console.log(
      "Some error occurred while fetching the Restaurant.",
      err.message
    );

    return res.status(200).send({
      message: "No Restaurant found with the given ID",
    });
  }
};

//Deleted any restaurant based on ID
module.exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findOneAndDelete({
      _id: req.params.id, // Create a query using the _id field
    });

    if (!deletedRestaurant) {
      return res.status(200).send({
        restaurants: null,
        message: "Restaurant deleted successfully.",
      });
    }

    res.status(200).send({
      restaurants: deletedRestaurant,
      message: "Restaurant deleted successfully.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while deleting the restaurant.",
    });
  }
};

//Delete all restaurants
module.exports.deleteAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.deleteMany({});
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send({
      restaurants: {
        acknowledged: Restaurant.acknowledged,
        deletedCount: Restaurant.deletedCount,
      },
      message: "Restaurants deleted successfully.",
    });
  }
};
