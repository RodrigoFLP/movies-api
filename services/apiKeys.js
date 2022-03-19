const MongoLib = require('../lib/mongo');

class apiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.client = new MongoLib();
  }

  async getApiKey({ token }) {
    try {
      const [apiKey] = this.client.getAll(this.collection, { token });
      return apiKey;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = apiKeysService;
