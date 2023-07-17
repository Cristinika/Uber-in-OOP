class User {
  constructor(id, name, email, phoneNumber) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.paymentMethods = [];
  }

  register() {
    console.log(`User ${this.name} registered successfully!`);
  }

  login() {
    this.loggedIn = true;
    console.log(`User ${this.name} logged in successfully!`);
  }

  updateProfile(newName) {
    this.name = newName;
    console.log(`Profile name updated. New name: ${this.name}`);
  }

  addPaymentMethod(paymentMethod) {
    this.paymentMethods.push(paymentMethod);
  }

  linkPaymentMethod(paymentMethod) {
    this.paymentMethods.push(paymentMethod);
    console.log(`Payment method "${paymentMethod}" linked to the user's account.`);
  }

  viewRideHistory() {
    console.log(`User ${this.name}'s ride history:`);
  }

  displayDetails() {
    console.log(`User ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Phone Number: ${this.phoneNumber}`);
    console.log(`Payment Methods: ${this.paymentMethods}`);
  }
}

class Customer extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, phoneNumber);
    this.loyaltyPoints = 0;
  }

  addLoyaltyPoints(points) {
    this.loyaltyPoints += points;
    console.log(`Added ${points} loyalty points. Total loyalty points: ${this.loyaltyPoints}`);
  }
// The redemption of customer loyalty points.
  redeemLoyaltyPoints(points) {
    if (this.loyaltyPoints >= points) {
      this.loyaltyPoints -= points;
      console.log(`Redeemed ${points} loyalty points. Remaining loyalty points: ${this.loyaltyPoints}`);
    } else {
      console.log(`Insufficient loyalty points. Loyalty points: ${this.loyaltyPoints}`);
    }
  }

  displayDetails() {
    super.displayDetails();
    console.log(`Loyalty Points: ${this.loyaltyPoints}`);
  }
}

class Driver extends User {
  constructor(id, name, email, phoneNumber, vehicle, licensePlate) {
    super(id, name, email, phoneNumber);
    this.vehicle = vehicle;
    this.licensePlate = licensePlate;
    this.assignedRides = [];
    this.earnings = 0;
  }

  register() {
    console.log(`Driver ${this.name} registered successfully!`);
  }

  updateProfile(newName) {
    this.name = newName;
    console.log(`Profile name updated. New name: ${this.name}`);
  }

  acceptRideRequest(ride) {
    ride.assignDriver(this);
    this.assignedRides.push(ride);
    console.log(`Ride request accepted. Assigned to ride with ID: ${ride.id}`);
  }

  cancelRideRequest(ride) {
    ride.cancel();
    this.assignedRides = this.assignedRides.filter((assignedRide) => assignedRide !== ride);
    console.log(`Ride request canceled. Notified user of ride cancellation.`);
  }

  completeRide(ride) {
    ride.complete();
    this.earnings += ride.calculateFare();
    console.log(`Ride completed. Driver earnings updated.`);
  }

  viewEarnings() {
    console.log(`Driver ${this.name}'s earnings: ${this.earnings}`);
  }

  displayDetails() {
    super.displayDetails();
    console.log(`Vehicle: ${this.vehicle}`);
    console.log(`License Plate: ${this.licensePlate}`);
    console.log(`Assigned Rides: ${this.assignedRides.length}`);
    console.log(`Earnings: ${this.earnings}`);
  }
}

class Ride {
  constructor(id, user, pickupLocation, destination) {
    this.id = id;
    this.user = user;
    this.driver = null;
    this.pickupLocation = pickupLocation;
    this.destination = destination;
    this.completed = false;
    this.fare = null;
    this.rating = null;
    this.review = null;
  }

  assignDriver(driver) {
    this.driver = driver;
  }

  cancel() {
    this.driver = null;
  }

  complete() {
    this.completed = true;
  }

  calculateFare() {
    // Calculate the fare based on factors such as distance, duration, and any additional charges
    // Assign the calculated fare to the 'fare' property
    this.fare = 30; // Sample fare value for demonstration
    return this.fare;
  }

  cancelRide() {
    // Cancel the ride request
    if (!this.completed) {
      this.cancel();
      console.log(`Ride request canceled. Notified user of ride cancellation.`);
    } else {
      console.log(`Cannot cancel a completed ride.`);
    }
  }

  rateDriver(rating, review) {
    // Rate and provide feedback on the assigned driver
    if (this.completed && this.driver) {
      this.rating = rating;
      this.review = review;
      console.log(`Driver rated with ${rating} stars. Review: ${review}`);
    } else {
      console.log(`Cannot rate the driver before completing the ride or without an assigned driver.`);
    }
  }
}

class PaymentMethod {
  constructor(id, type, lastFourDigits) {
    this.id = id;
    this.type = type;
    this.lastFourDigits = lastFourDigits;
  }
}




const user1 = new User('1', 'Cristina Onofrei', 'cristina.onofrei@yahoo.com', '0722646227');
user1.addPaymentMethod('Credit Card');
user1.addPaymentMethod('PayPal');
user1.displayDetails();

const customer1 = new Customer('1', 'Anna', 'anna@yahoo.com', '0724454789');
customer1.register();
customer1.login();
customer1.updateProfile('Anna');
customer1.linkPaymentMethod('Credit Card');
customer1.linkPaymentMethod('PayPal');
customer1.viewRideHistory();
customer1.addLoyaltyPoints(100);
customer1.redeemLoyaltyPoints(50);
customer1.displayDetails();

const ride1 = new Ride('1', user1); // Create the ride instance

const driver1 = new Driver('1', 'Andrew', 'andrew@example.com', '0745367123', 'Car', 'ABC123');
driver1.register();
driver1.updateProfile('Andrew');
driver1.acceptRideRequest(ride1);
driver1.completeRide(ride1);
driver1.viewEarnings();
driver1.displayDetails();


const paymentMethod1 = new PaymentMethod('1', 'Credit Card', '1234');
const paymentMethod2 = new PaymentMethod('2', 'Debit Card', '5678');

console.log(paymentMethod1);
console.log(paymentMethod2);