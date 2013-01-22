module.exports = exports = function extendPlugin (schema, options) {
    schema.add({ _type: String });
    schema.pre('save', function (next) {
        var type = this._type = this.constructor.modelName;
        next();
    });
    schema.path('_type').index(true);
};
