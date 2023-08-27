exports.restaurantResponse = (restaurants) => {
  var restaurantResponse = [];
  restaurants.forEach((restaurant) => {
    restaurantResponse.push({
      name: restaurant.name,
      description: restaurant.description,
      category: restaurant.category,
      imageURL: restaurant.imageURL,
      location: restaurant.location,
      phone: restaurant.phone,
      rating: restaurant.rating,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    });
  });
  return restaurantResponse;
};
