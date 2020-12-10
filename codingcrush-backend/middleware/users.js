module.exports = {
    /* vérifie la validité d'une inscription  */ 
    validateRegister: (req, res, next) => {
        // pseudo : longueur min. de 3
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                msg: 'Votre pseudo doit contenir au moins 3 caractères'
            });
        }

        // mot de passe :  min 6 caractères
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                msg: 'Votre mot de passe doit contenir au moins 6 caractères'
            });
        }

        // password (repeat) does not match
        if (
            !req.body.password_repeat ||
            req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                msg: 'Vos deux mots de passe doivent être identiques'
            });
        }

        next();
    },

    /* vérifie que le token de la requête est valide pour une personne connectée */
    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'andre'
            );
            req.userData = decoded;
            next();
        } catch (err) {
            return res.status(401).send({
                msg: 'Votre session n\'est pas valide !'
            });
        }
    }
};