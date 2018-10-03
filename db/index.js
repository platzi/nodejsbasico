const users = require("../resources/users");

module.exports = {
    getUsers: function() {
        return users;
    },
    getUserById: function(id) {
        return users.filter(user=>user._id===id);
    },
    getUserByAgeRange: function(lower = 0, higher = 99) {
        return users.filter(user=>user.age >= lower && user.age <= higher);
    }
}
