const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now },
});

const querySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'InProgress', 'Closed'], default: 'Open', required: true },
  resolution: { type: String, maxlength: 100, required: true },
  notes: [noteSchema],  
  created: { type: Date, default: Date.now }
});

querySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Query', querySchema);
