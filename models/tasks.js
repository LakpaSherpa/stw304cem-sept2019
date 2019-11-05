const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    }
}, { timestamps: true });
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    notes: [notesSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
