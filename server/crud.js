let User = require('./User/user'),
    bcrypt = require('bcrypt'),
    mysql = require('mysql');

const USER_DETAILS_TABLE_NAME = 'userDetails',
    DATABASE_NAME = 'testDB',
    idCol = 'id',
    nameCol = 'name',
    surnameCol = 'surname',
    emailCol = 'email',
    passwordCol = 'password';

let con = mysql.createConnection({
    host: 'localhost',
    user: 'testUser',
    password: 'test',
    database: DATABASE_NAME
});

con.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");
});

let createTable =  (tableName) => {
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
        console.log("Result: " + result);
    })
};

module.exports.getUserByEmail = (email, callback) => {
    const queryString = 'SELECT * FROM '
                        + USER_DETAILS_TABLE_NAME
                        + ' WHERE ' + emailCol + '="' + email + '";';
    con.query(queryString, (err, result) => {
            if (err) {
                //errno1146 means that table doesn't exist
                if(err.errno === 1146) {
                    createTable(USER_DETAILS_TABLE_NAME);
                } else {
                    throw err;
                }
            }
            var user = result.length > 0 ? new User(result[0]) : undefined;
            callback(user);
        });
};

let getHash = (password) => {
    return bcrypt.hashSync(password, 10);
};

let isPasswordsMatch = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports.registerNewUser = (user, callback) => {
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
};


//
// var crud = {
//     doLogin: (userDetails) => {
//         con.query('SELECT * FROM ' + USER_DETAILS_TABLE_NAME + ';', (err, result) => {
//             if (err) {
//                 console.log('error: ', err.message);
//                 createTable(USER_DETAILS_TABLE_NAME);
//             }
//             console.log("Result: " + result);
//         });
//     },
//
//     register: (userDetails) => {
//
//     }
// };
//
// module.exports = crud;