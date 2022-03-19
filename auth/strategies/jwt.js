const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const boom = require('@hapi/boom');

const { config } = require('../../config');
const UserService = require('../../services/users');

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: config.authJwtSecret,
    },
    async (jwtPayload, done) => {
      const userService = new UserService();

      try {
        const user = userService.getUser({ email: jwtPayload.email });

        if (!user) {
          done(boom.unauthorized(), false);
        }

        delete user.password;

        done(null, { ...user, scopes: jwtPayload.scopes });
      } catch (err) {
        done(err);
      }
    }
  )
);
