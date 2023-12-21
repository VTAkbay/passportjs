import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { users } from './users';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ONLYJS_SECRET',
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    const user = Object.values(users).find(user => user.id === jwt_payload.sub);

    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

export default passport;
