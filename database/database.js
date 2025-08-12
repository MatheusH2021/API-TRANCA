const mongoose = require('mongoose');

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb://127.0.0.1:27017/tags-storage');
    console.log('🟢 Conectado ao MongoDB com Mongoose!');
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
}

module.exports = main;