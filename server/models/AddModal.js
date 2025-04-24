import mongoose from 'mongoose';
const AddModalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        default: [String],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    UserId: {
        type: String,
        default:[],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },


})
const AddModal = mongoose.model('AddModal', AddModalSchema);
export default AddModal