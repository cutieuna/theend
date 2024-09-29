
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Role Schema
const RoleSchema = new Schema({
    roleName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Role', RoleSchema);
