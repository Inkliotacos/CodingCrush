const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');
const quizzMiddleware = require('../middleware/quizz.js')
// PENSER A FAIRE QUIZZMIDDLEWARE

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
              `INSERT INTO users (id, username, lastname, firstname, birthdate, profilimageurl, mail, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.username
                )},${db.escape(
                  req.body.firstname
                )},${db.escape(
                  req.body.lastname
                )},${db.escape(
                  req.body.birthdate
                )},${db.escape(
                  req.body.profilimage
                )},${db.escape(
                  req.body.email
                )},
                ${db.escape(hash)}, now())`,
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
    `UPDATE users SET descriptionUser = ${db.escape(req.body.description )}, profilimageurl =  ${db.escape(req.body.profilimage)}, mail =  ${db.escape(req.body.mail)}, facebooklink = ${db.escape(req.body.facebookLink )}, instagramlink = ${db.escape(req.body.instagramLink )}, twitterlink = ${db.escape(req.body.twitterLink )}, steamlink = ${db.escape(req.body.steamLink )} WHERE id = ${db.escape(req.body.idUser)} `
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
  );

router.post('/get-user', (req, res, next) => { 
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
);

router.post('/update-compat', (req, res, next) => { 
  db.query(
    `INSERT INTO compatibilities (firstUserId, secondUserId, value) VALUES (${db.escape(
      req.body.idFirstUser
    )},${db.escape(
      req.body.idSecondUser
    )},${db.escape(
      req.body.value
    )})`,),
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
      }
    }
  );

router.post('/get-compatibility', (req, res, next) => { 
  db.query(
          `SELECT value FROM compatibilities WHERE firstUserId = ${db.escape(req.body.idFirstUser)} AND secondUserId = ${db.escape(req.body.idSecondUser)} ;`,
          (err, result) => {
          return res.status(200).send({
            compat: result[0],
            //msg: 'Mise à jour réussie !'
          });
        }
        )
      },
  );

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

router.post('/get-users', (req, res, next) => {
  db.query(
    `SELECT * FROM users ORDER BY last_login DESC LIMIT 4`,
    (err, result) => {  
    return res.status(200).send({
      users: result,
      //msg: 'Mise à jour réussie !'
    });
  }
  )
});

router.post('/get-all-users', (req, res, next) => {
  db.query(
    `SELECT username, id, profilimageurl FROM users ORDER BY username ASC`,
    (err, result) => {  
    return res.status(200).send({
      users: result,
      //msg: 'Mise à jour réussie !'
    });
  }
  )
});

router.post('/add-quizz', (req, res, next) => {
  db.query(
    `INSERT INTO quizz (name, creatorid, creationdate, numberquestions) VALUES (${db.escape(
        req.body.quizzname
      )},${db.escape(
        req.body.creatorid
      )}, now(), ${db.escape(
        req.body.numberquestions
      )} )`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(201).send({
        msg: 'Création réussie !'
      });
    }
  );
});

router.post('/add-question', quizzMiddleware.validateCreateQuizz, (req, res, next) => {
  db.query(
    `INSERT INTO littlequizz (creatorid, question, creationdate, correctanswer, incorrectanswer1, incorrectanswer2, incorrectanswer3) VALUES (${db.escape(
        req.body.creatorid
      )},${db.escape(
        req.body.question
      )}, now(), ${db.escape(
        req.body.correctAnswer
      )}, ${db.escape(
        req.body.incorrectAnswer1
      )}, ${db.escape(
        req.body.incorrectAnswer2
      )}, ${db.escape(
        req.body.incorrectAnswer3
      )} )`,
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(201).send({
        msg: 'Création réussie !'
      });
    }
  );
});

router.post('/get-questions', (req, res, next) => {
  db.query(
    `SELECT littlequizz.id AS quizzid, question, creationdate, creatorid, users.username FROM littlequizz 
    INNER JOIN users 
    ON creatorid = users.id 
    WHERE users.id = creatorid
    ORDER BY creationdate
    DESC LIMIT 5`,
    (err, result) => {  
    return res.status(200).send({
      question: result,
      //msg: 'Mise à jour réussie !'
    });
  }
  )
});

router.post('/get-question', (req, res, next) => { 
  db.query(
          `SELECT * FROM littlequizz WHERE id = ${db.escape(req.body.idQuizz)};`,
          (err, result) => {
          return res.status(200).send({
            quizz: result[0],
            //msg: 'Mise à jour réussie !'
          });
        }
        )
      },
);

router.post('/add-crush', (req, res, next) => {
  db.query(
    `INSERT INTO crushs (idSender, idRecipient, message, date) VALUES (${db.escape(
        req.body.idSender
      )},${db.escape(
        req.body.idRecipient
      )},${db.escape(
        req.body.message
      )}, now() )`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(201).send({
        msg: 'Crush envoyé ! Tu gères grave bg !'
      });
    }
  );
});

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router;