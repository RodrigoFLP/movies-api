const MongoLib = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.client = new MongoLib();
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.client.getAll(this.collection, query);
    return userMovies || [];
  }

  async createUserMovie({ userMovie }) {
    const createdUserMovie = await this.client.create(
      this.collection,
      userMovie
    );
    return createdUserMovie;
  }

  async deleteUserMovie({ userMovieId }) {
    const deletedUserMovie = await this.client.delete(
      this.collection,
      userMovieId
    );
    return deletedUserMovie;
  }
}

module.exports = { UserMoviesService };
