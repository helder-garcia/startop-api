var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProjectSchema   = new Schema({
   name: String,
   description: String,
   businessPlan: String,
   videoPitch: String,
   presentation: String,
   segment: String,
   projectStatus: String,
   investment: Number,
   owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
   }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Project', ProjectSchema);
