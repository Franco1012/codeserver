import passport from "passport";
import environment from "../utils/env.util.js";
//import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as localStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
//import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js";
import dao from "../app/dao.factory.js"
import { createHash, veryfyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
import sendEmail from "../utils/mailing.util.js";
//import crypto from "crypto";

import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";


const { usersManager } = dao
passport.use(
    "register",
    new localStrategy(
        { passReqToCallback: true, usernameField: "email" },//passResqToCallback , para acceder al objeto requerimiento de la solicitud
        async (req, email, password, done) => {
            try {
                //La estrategia necesaria para registrar a un usuario
                //Que consta de todo lo que validamos en los middlewares

                if (!email || !password) {//no necesito desestructurar las propiedades (email,password) la callback ya las necesita y las configura


                    const error = CustomError.new(errors.invalid)

                    return done(null, null, error)// el done se encarga directamente, no hace falta arrojar el error para que lo tome el catch

                }
                const one = await usersRepository.readByEmailRepository(email);
                if (one) {

                    const error = CustomError.new(errors.auth)


                    return done(error)

                }

                const data = new UsersDTO(req.body)

                const user = await usersRepository.createRepository(data)//la creación se tiene que dar también en la estrategía
                //una vez que el usuario se crea
                //la estrategia debe mandar un correo electronico con un codigo aleatorio para la verificacion del usuario


                await sendEmail({


                    email,
                    to: email,
                    code: user.verifyCode
                })

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
                const user = await usersRepository.readByEmailRepository(email);
                if (!user) {
                    const error = CustomError.new(errors.auth)
                    return done(error)

                }

                //verificamos la contraseña
                const verifyPass = veryfyHash(password, user.password)
                //verificamos el usuario
                const verifyAccount = user.verify

                //console.log(verifyPass)
                //console.log(verifyAccount)

                if (verifyPass && verifyAccount) {

                    //req.session.email = email
                    //req.session.role = user.role
                    //req.session.online = true
                    //req.session.userId = user._id
                    //req.session.photo = user.photo
                    const data = {
                        email,
                        photo: user.photo,
                        role: user.role,
                        _id: user._id,
                        online: true
                    }
                    const token = createToken(data)
                    user.token = token //agrega la propiedad token al objeto user
                    return done(null, user)//agrega la propiedad user al objeto de requerimientos


                }
                //utilizamos el CustomError como ejemplo
                const error = CustomError.new(errors.invalid)
                return done(error)

            } catch (error) {
                return done(error)
            }
        }))

passport.use("google",
    new GoogleStrategy(
        {
            clientID: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/sessions/google/callback",
            passReqToCallback: true
        },
        async (req, accesToken, refreshToken, profile, done) => {
            try {
                //profile es el ojeto que devuelve google con tosdos los datos del usuario
                //nosotros vamos a registrar un id en lugar de un email
                const { id, picture } = profile
                let user = await usersManager.readByEmail(id)
                if (!user) {
                    user = {
                        email: id,
                        password: createHash(id),
                        photo: picture
                    }
                    user = await usersManager.create(user)
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

/*passport.use("jwt",
    new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
        secretOrKey: environment.SECRET_JWT
    },
        (data, done) => {
            try {
                if (data) {
                    return done(null, data)
                } else {
                    const error = new Error("Forbidden from jwt!")
                    error.statusCode = 401;
                    return done(error)
                }

            } catch (error) {
                return done(error)
            }
        }

    ))*/

export default passport