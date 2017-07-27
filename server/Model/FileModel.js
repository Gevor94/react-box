let FileModel = function(name, owner, path, type, id, filteredContent) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.path = path;
    this.type = type;
    this.filteredContent = filteredContent;
};

module.exports = FileModel;