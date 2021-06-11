![RentMyRideBanner](https://user-images.githubusercontent.com/74951540/112772776-82d2c300-8fe7-11eb-88d3-6a76775aedf9.jpg)
## RentMyRide
RentMyRide is a clone of AirBnB with a focus on allowing users to rent a luxury car to make their vacations that much better. The two week full-stack project incorporates 4 main MVP features and some bonus features:

**MVPs**
* Google map car finder- User can look up cars through google api search functionality based on location
  * Currently only seed data added exists for cars in Las Vegas and Los Angeles 
* Bookings- Users can book a car that others are renting out
* My Bookings- Users can view all their booked cars
* Car Reviews- Users can leave reviews on cars they don't own

**Bonuses**
* Removing Cars- Users can delete car they are hosting
* Hosting- Any user can host cars




*********************
## GoogleMap Car Finder
All users can search cars for rent through the Google Map search funcionality. As the user types on the search bar the user will recieve location recommendations to autofill. Once a location has been selected the cars will in that location will render right next to the map for the user to choose from.

![GoogleSearchAPI](https://github.com/JairoCal/RentMyRide/blob/main/wiki_images/LookUpCars.png)

## Comments and Categories
**Categories** allows users to view videos based only on the categories they follow based on their preference on user signup. Each video will render **comments** on the right Navbar after having clicked on a video. A logged in user will then have the option to comment on the chosen video either through the input box or with a GIF through the use of Giphys api.
![BookCar](https://github.com/JairoCal/RentMyRide/blob/main/wiki_images/UserCanBookCar.png)


## Direct Messaging
**Live Chat Meessaging** implemented through **Websockets** allows users to communicate with others through real time. Users can go to their messages and chat with someone they've previously messaged or can initiate a chat with a new user from the homepage by selecting on a users name.
![BookedCars](https://github.com/JairoCal/RentMyRide/blob/main/wiki_images/ViewBookedCars.png)

![ReviewCar](https://github.com/JairoCal/RentMyRide/blob/main/wiki_images/ReviewCar.png)
