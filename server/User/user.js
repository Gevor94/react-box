var User = function(user){
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.password = user.password;
};

module.exports = User;