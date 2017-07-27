let UserModel = require('./Model/UserModel'),
    bcrypt = require('bcrypt'),
    mysql = require('mysql'),
    configs = require('./Configs/config'),
    path = require('path'),
    fs = require('fs');

const USER_DETAILS_TABLE_NAME = configs.USER_DETAILS_TABLE_NAME,
    DATABASE_NAME = configs.DATABASE_NAME,
    FILES_DETAILS_TABLE_NAME = configs.FILES_DETAILS_TABLE_NAME,
    idCol = 'id',
    nameCol = 'name',
    bookmarksCol = 'bookmarks',
    surnameCol = 'surname',
    emailCol = 'email',
    passwordCol = 'password',
    ownerCol = 'owner',
    pathCol = 'path',
    fileContentCol = 'file_content';

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
        + passwordCol +' VARCHAR(255), '
        + bookmarksCol +' VARCHAR(255));';
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
        + nameCol + ' VARCHAR(255), '
        + ownerCol + ' VARCHAR(255), '
        + pathCol + ' VARCHAR(255),'
        + fileContentCol + ' VARCHAR(255)'
        + ');';
    con.query(queryString, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log('Created Files Table');
    })
};

let getFileContent = (file) => {
    var content = fs.readFileSync(path.join(__dirname, file.path));
    return content.toString().replace(/\"/g, '\\"');
};

let getHash = (password) => {
    return bcrypt.hashSync(password, 10);
};

let getRow = (query, content) => {
    let index = content.indexOf(query),
        tempString = content.substring(0,index),
        lineNumber = tempString.split('\n').length,
        filteredContent = [];

    content = content.split('\n');
    for(let i = 3; i > 0; --i) {
        if(content[lineNumber -i]) {
            filteredContent.push(content[lineNumber - i] + '\n');
        }
    }
    for (let i = 0 ; i < 4; i++) {
        if(content[lineNumber + i]) {
            filteredContent.push(content[lineNumber + i] + '\n');
        }
    }
    filteredContent = filteredContent.join('\n');
    return filteredContent;

};

let  makeQuery = (queryRow, callback, answ ) => {
    const queryString = 'SELECT ' + nameCol + ', '
        + ownerCol + ', '
        + pathCol + ', '
        + idCol + ' FROM '
        + FILES_DETAILS_TABLE_NAME
        + ' WHERE CONCAT(' + nameCol + ', " ", ' + fileContentCol + ')'
        + ' LIKE "%' + queryRow + '%";';
    const queryContent = (nameColumn) => {
        const query = 'SELECT ' + fileContentCol
            + ' FROM ' + FILES_DETAILS_TABLE_NAME
            + ' WHERE ' + nameCol + '="' + nameColumn + '";';
        return query;
    };

    con.query(queryString, (err, result) => {
        if (err) {
            callback(error, result);
        } else {
            if (result.length) {
                let counter = 0;
                for(let i = 0, len = result.length; i < len; ++i) {
                    con.query(queryContent(result[i].name), (err, res) => {
                        if (err) {
                            callback(err, result);
                        } else {
                            result[i].filteredContent = getRow(queryRow,res[0].file_content);
                            counter++;
                            if (counter >= len) {
                                return answ(result);
                            }
                        }
                    });
                }

            } else {
                answ(result);
            }
        }
    });

};

module.exports = {

    insertFile: (file, callback) => {
        file.content = getFileContent(file);
        const queryString = 'INSERT INTO ' + FILES_DETAILS_TABLE_NAME
            + ' ( ' + nameCol + ', ' +  ownerCol + ', '
            + pathCol + ', ' + fileContentCol + ') VALUES("'
            +  file.name + '", "' + file.owner
            + '", "' + file.path + '", "' + file.content + '");';
        con.query(queryString, (err, result) => {
            if (err) {
                if(err.errno === 1146) {
                    return createFilesDetailsTable(FILES_DETAILS_TABLE_NAME);
                }
                return callback(err);
            }
            callback(false, result.insertId);
        });
    },

    deleteFile: (file, callback) => {
        const queryString = 'DELETE ' + ' FROM ' + FILES_DETAILS_TABLE_NAME
            + ' WHERE ' + nameCol + ' = ' + '\'' + file.name + '\'' + ' and ' + idCol + ' = '
            + file.id  + ';';
        con.query(queryString, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(false, file);
        });
    },

    getAllFiles: (callback) => {
        const queryString = 'SELECT * FROM ' + FILES_DETAILS_TABLE_NAME;
        con.query(queryString, (err, result) => {
            if(err) {
                return callback(err);
            }
            callback(false, result);
        });
    },

    getMatchedFiles: (searchQuery, callback) => {
        let fullMatchingQuery = searchQuery.replace(/\s\s+/g, ' '),
            splittedQuery = fullMatchingQuery.trim().split(' '),
            counter = 0;
        makeQuery(fullMatchingQuery, callback, (result) => {
            if(splittedQuery.length) {
                for (let i=0,len=splittedQuery.length; i < len; ++i) {
                    makeQuery(splittedQuery[i], callback, (res) => {
                        counter++;
                        result.push.apply(result,res);
                        if(counter >= splittedQuery.length) {
                            callback(false, result);
                        }
                    });
                }
            } else {
                callback(false, result);
            }
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
                return callback(false, err);
            }
            //assume that email is unique.
            let user = result.length > 0 ? new UserModel(result[0]) : undefined;
            callback(user);
        });
    },

    changeBookmarks: (email, bookmark, callback) => {
        let bookmarks = bookmark.join('\n');
        const queryString = 'UPDATE ' + USER_DETAILS_TABLE_NAME
        + ' SET ' + bookmarksCol + '='
        + '\'' + bookmarks + '\'' + ' WHERE ' + emailCol + '=' + '\'' + email + '\'' + ';';

        con.query(queryString, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(false, result);
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
                return callback(false, result);
            }
            callback(result);
        });
    },

    getUserBookmarks: (file,callback) => {
        const queryString = 'SELECT ' + bookmarksCol + ' FROM '
            + USER_DETAILS_TABLE_NAME
            + ' WHERE ' + emailCol + '="' + file.email + '";';

        con.query(queryString, (err, result) => {
            if (err) {
                callback(err, result);
            }
            callback(err,result);
        });
    }
};
