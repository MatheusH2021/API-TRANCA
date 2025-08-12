const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  data_hora: { type: Date, default: Date.now },
  ativo: { type: String, required: true}
});

const Tag = mongoose.model("tags", tagSchema);
module.exports = {Tag, tagSchema};