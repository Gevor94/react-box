let User = require('./User/user'),
    bcrypt = require('bcrypt'),
    mysql = require('mysql'),
    configs = require('./Configs/config');

const USER_DETAILS_TABLE_NAME = configs.USER_DETAILS_TABLE_NAME,
    DATABASE_NAME = configs.DATABASE_NAME,
    idCol = 'id',
    nameCol = 'name',
    surnameCol = 'surname',
    emailCol = 'email',
    passwordCol = 'password';

let con = mysql.createConnection({
    host: configs.mySqlHost,
    user: configs.mySqlUsername,
    password: configs.mySqlPassword,
    database: DATABASE_NAME
});

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected!");
});

let createTable =  (tableName, next) => {
    const queryString = 'CREATE TABLE ' + tableName
        + ' ('
        + idCol + ' int PRIMARY KEY AUTO_INCREMENT, '
        + nameCol +' VARCHAR(255), '
        + surnameCol + ' VARCHAR(255), '
        + emailCol + ' VARCHAR(255), '
        + passwordCol +' VARCHAR(255));';
    con.query(queryString, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log('Created');
    })
};

let getHash = (password) => {
    return bcrypt.hashSync(password, 10);
};

module.exports = {

    getUserByEmail: (email, callback) => {
        const queryString = 'SELECT * FROM '
            + USER_DETAILS_TABLE_NAME
            + ' WHERE ' + emailCol + '="' + email + '";';
        con.query(queryString, (err, result) => {
            if (err) {
                //errno1146 means that table doesn't exist
                if(err.errno === 1146) {
                    createTable(USER_DETAILS_TABLE_NAME);
                    return;
                }
            }
            //assume that email is unique.
            var user = result.length > 0 ? new User(result[0]) : undefined;
            callback(user);
        });
    },

    isPasswordsMatch: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    },

    registerNewUser: (user, callback) => {
        const queryString = 'INSERT INTO ' + USER_DETAILS_TABLE_NAME
            + ' ( ' + nameCol + ', ' +  surnameCol + ', '
            + emailCol + ', ' + passwordCol + ') VALUES("'
            +  user.name + '", "' + user.surname
            + '", "' + user.email + '", "' + getHash(user.password) + '");';
        con.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
};