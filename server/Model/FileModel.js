let FileModel = function(name, owner, path, id) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.path = path;
};

module.exports = FileModel;