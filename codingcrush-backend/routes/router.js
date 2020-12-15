const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

/* route d'inscription */
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'Ce pseudo est déja utilisé !'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, username, lastname, birthdate, profilimageurl, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.username
                )},${db.escape(
                  req.body.lastname
                )},${db.escape(
                  req.body.birthdate
                )},${db.escape(
                  req.body.profilimage
                )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Inscription réussie !'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/update-profile', (req, res, next) => { 
  db.query(
    `UPDATE users SET descriptionUser = ${db.escape(req.body.description )}, profilimageurl =  ${db.escape(req.body.profilimage)} WHERE id = ${db.escape(req.body.idUser)} `
      ),
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        db.query(
          `SELECT * FROM users WHERE id = ${db.escape(req.body.idUser)};`,
          (err, result) => {
          return res.status(200).send({
            user: result[0],
            msg: 'Mise à jour réussie !'
          });
        }
        )
      }
    }
  )

router.get('/get-user', (req, res, next) => { 
  db.query(
          `SELECT * FROM users WHERE id = ${db.escape(req.body.idUser)};`,
          (err, result) => {
          return res.status(200).send({
            user: result[0],
            //msg: 'Mise à jour réussie !'
          });
        }
        )
      },
)
      

router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Votre pseudo ou votre mot de passe est incorrect !'
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Votre pseudo ou votre mot de passe est incorrect !'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'andre', {
                expiresIn: '7d'
              }
            );

            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: 'Connecté !',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Votre pseudo ou votre mot de passe est incorrect !'
          });
        }
      );
    }
  );
});

router.get('/users', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;