let UserModel = require('./Model/UserModel'),
    File = require('./Model/FileModel'),
    bcrypt = require('bcrypt'),
    mysql = require('mysql'),
    configs = require('./Configs/config');

const USER_DETAILS_TABLE_NAME = configs.USER_DETAILS_TABLE_NAME,
    DATABASE_NAME = configs.DATABASE_NAME,
    FILES_DETAILS_TABLE_NAME = configs.FILES_DETAILS_TABLE_NAME,
    idCol = 'id',
    nameCol = 'name',
    surnameCol = 'surname',
    emailCol = 'email',
    passwordCol = 'password',
    ownerCol = 'owner',
    pathCol = 'path';

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

let createUsersDetailsTable =  (tableName) => {
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
        console.log('Created Users Table');
    })
};

let createFilesDetailsTable =  (tableName) => {
    const queryString = 'CREATE TABLE ' + tableName
        + ' ('
        + idCol + ' int PRIMARY KEY AUTO_INCREMENT, '
        + nameCol +' VARCHAR(255), '
        + ownerCol + ' VARCHAR(255), '
        + pathCol +' VARCHAR(255));';
    con.query(queryString, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log('Created Files Table');
    })
};

let getHash = (password) => {
    return bcrypt.hashSync(password, 10);
};

module.exports = {

    insertFile: (file, callback) => {
        const queryString = 'INSERT INTO ' + FILES_DETAILS_TABLE_NAME
            + ' ( ' + nameCol + ', ' +  ownerCol + ', '
            + pathCol + ') VALUES("'
            +  file.name + '", "' + file.owner
            + '", "' + file.path + '");';
        con.query(queryString, (err, result) => {
            if (err) {
                if(err.errno === 1146) {
                    createFilesDetailsTable(FILES_DETAILS_TABLE_NAME);
                    return;
                }
                callback(err);
            }
            callback();
        });
    },

    getAllFiles: (callback) => {
        const queryString = 'SELECT * FROM ' + FILES_DETAILS_TABLE_NAME;
        con.query(queryString, (err, result) => {
            if(err) {
                callback(err);
            }
            callback(false, result);
        });
    },

    getUserByEmail: (email, callback) => {
        const queryString = 'SELECT * FROM '
            + USER_DETAILS_TABLE_NAME
            + ' WHERE ' + emailCol + '="' + email + '";';
        con.query(queryString, (err, result) => {
            if (err) {
                //errno1146 means that table doesn't exist
                if(err.errno === 1146) {
                    createUsersDetailsTable(USER_DETAILS_TABLE_NAME);
                    return;
                }
                callback(false, err);
            }
            //assume that email is unique.
            let user = result.length > 0 ? new UserModel(result[0]) : undefined;
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
                callback(false, result);
            }
            callback(result);
        });
    }
};