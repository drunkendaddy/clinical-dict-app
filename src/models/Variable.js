const mongoose = require('mongoose');

const variableSchema = new mongoose.Schema({
  variableName: String,
  category: {
    type: String,
    enum: ['Calculated', 'Original', 'Derived'],
    default: 'Calculated'
  },
  crfDataType: {
    type: String,
    enum: ['Number', 'Text', 'Date', 'Time'],
    default: 'Text'
  },
  description: String,
  valueLowerLimit: Number,
  valueUpperLimit: Number,
  isRequired: Boolean,
  Units: String,
  FormName: [String]
});

module.exports = mongoose.model('Variable', variableSchema);