const User = require('./Users');
const Trip = require('./Trip');

// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});