var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
   username: String,
   name: String,
   email: String,
   password: String,
   phone: String,
   whatsapp: String,
   type: Number,
   projects: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
   ]
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);
