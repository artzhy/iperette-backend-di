const mongoose = require('mongoose');

class UserService {
  constructor({ user }) {
    this.userModel = user;
  }
  add(user) {
    return this.userModel.create(user);
  }
  getAll() {
    return this.userModel.find({});
  }
  getUserById(userId) {
    return this.userModel.find({ _id: userId });
  }
  getUserByEmail(email) {
    return this.userModel.find({ email: email });
  }
  getBookingsOfUser(userId) {
    return this.userModel.find({ _id: userId }, { bookings: true });
  }
  flush() {
    return this.userModel.remove();
  }
}
module.exports = UserService;
