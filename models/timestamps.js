module.exports = exports = function lastModifiedPlugin (schema, options) {
    schema.add({ created_at: Date, updated_at: Date });
    schema.pre('save', function (next) {
        if (!this.created_at) this.created_at = new Date;
        this.updated_at = new Date;
        next();
    });
    if (options && options.index) {
        schema.path('created_at').index(options.index);
        schema.path('updated_at').index(options.index);
    }
}
