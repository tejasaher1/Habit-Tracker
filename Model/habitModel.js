const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    habitNames: {
        type: String,
        required: true
    },

    // status: {
    //     type: String,
    //     required: true,
    //     enum: ['done', 'Not Done', 'Not Started']
    // }

    dailyStatus: [{
        day: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['done', 'Not Done', 'Not Started']
        }
    }]
    
},{
    timestamps: true 
});



const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;