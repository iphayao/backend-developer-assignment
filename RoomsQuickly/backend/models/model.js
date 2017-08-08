var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    passworld: String,
    created_at: { type: Date, default: Date.now }
});

var auctionSchema = new mongoose.Schema({
    id: Number,
    description: String,
    created_at: { type: Date, default: Date.now },
    expired_at: { type: Date, default: Date.now }
});

mongoose.model("User", userSchema);
mongoose.model("Auction", auctionSchema);