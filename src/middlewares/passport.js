import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js";
import { createHash, veryfyHash } from "../utils/hash.util.js";

passport.use(
    "register",
    new localStrategy(
        { passReqToCallback: true, usernameField: "email" },//passResqToCallback , para acceder al objeto requerimiento de la solicitud
        async (req, email, password, done) => {
            try {
                //La estrategia necesaria para registrar a un usuario
                //Que consta de todo lo que validamos en los middlewares

                if (!email || !password) {//no necesito desestructurar las propiedades (email,password) la callback ya las necesita y las configura

                    const error = new Error("Please enter email and data")
                    error.statusCode = 404
                    return done(error)// el done se encarga directamente, no hace falta arrojar el error para que lo tome el catch
                }

                const one = await gestorDeUsuarios.readByEmail(email);
                if (one) {
                    const error = new Error("Bad auth from register!")
                    error.statusCode = 401;
                    return done(error)

                }
                const hashPassword = createHash(password);
                req.body.password = hashPassword
                const user = await gestorDeUsuarios.create(req.body)//la creación se tiene que dar también en la estrategía

                return done(null, user)



            } catch (error) {

                return done(error)
            }
        }
    )
)

passport.use(
    "login",
    new localStrategy(
        { passReqToCallback: true, usernameField: "email" },//passResqToCallback , para acceder al objeto requerimiento de la solicitud
        async (req, email, password, done) => {
            try {
                const user = await gestorDeUsuarios.readByEmail(email);
                if (!user) {
                    const error = new Error("Bad auth from login!")
                    error.statusCode = 401;
                    return done(error)

                }
                const verify = veryfyHash(password, user.password)

                if (verify) {
                    req.session.email = email
                    req.session.role = user.role
                    req.session.online = true
                    req.session.userId = user._id
                    req.session.photo = user.photo

                    return done(null, user)

                }

                const error = new Error("Invalid credentials")
                error.statusCode = 401;
                return done(error)

            } catch (error) {
                return done(error)
            }
        }))

passport.use("google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/sessions/google/callback",
            passReqToCallback: true
        },
        async (req, accesToken, refreshToken, profile, done) => {
            try {
                //profile es el ojeto que devuelve google con tosdos los datos del usuario
                //nosotros vamos a registrar un id en lugar de un email
                const { id, picture } = profile
                let user = await gestorDeUsuarios.readByEmail(id)
                if (!user) {
                    user = {
                        email: id,
                        password: createHash(id),
                        photo: picture
                    }
                    user = await gestorDeUsuarios.create(user)
                }
                req.session.email = user.email;
                req.session.online = true;
                req.session.role = user.role;
                req.session.userId = user._id;
                return done(null, user)

            } catch (error) {
                return done(error)
            }

        }
    )
)
export default passport