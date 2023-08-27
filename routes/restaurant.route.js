const restaurantController = require("../controllers/restaurant.controller");

module.exports = function (app) {
  app.post("/api/restaurant/add", restaurantController.add);
  app.get("/api/restaurant", restaurantController.findAllRestaurant);
  app.get("/api/restaurant/categories", restaurantController.getCategory);
  app.get(
    "/api/restaurant/categories/:categoryName",
    restaurantController.getCategoryName
  );
  app.get("/api/restaurant/:id", restaurantController.getRestaurantByID);
  app.get(
    "/api/restaurant/rating/:ratingValue",
    restaurantController.getRestaurantByRating
  );
  app.put("/api/restaurant/:id", restaurantController.updateRestaurant);
  app.delete("/api/restaurant/:id", restaurantController.deleteRestaurant);
  app.delete("/api/restaurant", restaurantController.deleteAllRestaurant);
};
