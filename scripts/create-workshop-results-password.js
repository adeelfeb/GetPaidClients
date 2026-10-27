require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env') });
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local'), override: true });
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is missing from .env');
  const password = crypto.randomBytes(12).toString('base64url');
  await mongoose.connect(uri);
  const collection = mongoose.connection.collection('workshopadmincredentials');
  await collection.updateOne(
    { key: 'workshop-results' },
    { $set: { key: 'workshop-results', passwordHash: await bcrypt.hash(password, 12), updatedAt: new Date() } },
    { upsert: true }
  );
  console.log(`Workshop results password: ${password}`);
  console.log('URL: /workshop-results');
  await mongoose.disconnect();
}

main().catch(async (error) => { console.error(`Failed: ${error.message}`); await mongoose.disconnect(); process.exit(1); });
