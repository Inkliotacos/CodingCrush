module.exports = {
    /* vérifie la validité d'une inscription  */ 
    validateCreateQuizz: (req, res, next) => {
        // Question : longueur min. de 5
        if (!req.body.question || req.body.question < 3) {
            return res.status(400).send({
                msg: 'Votre question doit contenir au moins 5 caractères'
            });
        }

        // Réponses : longueur min. de 1
        if ((!req.body.correctAnswer || req.body.correctAnswer.length < 1) || (!req.body.incorrectAnswer1 || req.body.incorrectAnswer1.length < 1) || (!req.body.incorrectAnswer2 || req.body.incorrectAnswer2.length < 1) || (!req.body.incorrectAnswer3 || req.body.incorrectAnswer3.length < 1)) {
            return res.status(400).send({
                msg: 'Vos réponses ne peuvent pas être vides'
            });
        }

        // Réponses : Toutes différentes
        if (req.body.correctAnswer == req.body.incorrectAnswer1 || req.body.correctAnswer == req.body.incorrectAnswer2 || req.body.correctAnswer == req.body.incorrectAnswer3 || req.body.incorrectAnswer1 == req.body.incorrectAnswer2 || req.body.incorrectAnswer1 == req.body.incorrectAnswer3 || req.body.incorrectAnswer2 == req.body.incorrectAnswer3) {
            return res.status(400).send({
                msg: 'Les réponses doivent être différentes'
            });
        }

        next();
    }
}

/*

req.body.creatorid
        req.body.question
        req.body.correctAnswer
        req.body.incorrectAnswer1
        req.body.incorrectAnswer2
        req.body.incorrectAnswer3
        */