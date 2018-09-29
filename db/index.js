const users = require("../resources/users");

module.exports = {
    getUsers: function() {
        return users;
    },
    getUserById: function(id) {
        return users.filter(user=>user._id===id);
    }
}
