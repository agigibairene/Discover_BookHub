const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true,
        enum: ['genres', 'discover']
    },
    specificType: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (this.category === 'genres') {
                    return ['Self-help', 'Religion', 'Fiction', 'Romance', 'Poetry'].includes(value);
                } 
                else if (this.category === 'discover') {
                    return ['Trending', 'Popular', 'New Release', 'Best Seller'].includes(value);
                }
                return false; 
            },
            message: props => `${props.value} is not a valid specificType for category ${this.category}.`
        }
    }
}, {
    timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;