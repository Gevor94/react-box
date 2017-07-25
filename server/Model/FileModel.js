let FileModel = function(name, owner, path,  id, filteredContent) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.path = path;
    this.filteredContent = filteredContent;
};

module.exports = FileModel;