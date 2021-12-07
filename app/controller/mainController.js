const path = require('path');


const mainController = {


        main: (req, res) => {

            res.status(200).render("index");
        },

        anssi: (req, res) => {

            res.status(200).sendFile(path.resolve(__dirname + `./../public/attestation_secnumacademie.pdf`));
            res.setHeader('Content-type', 'application/pdf');
        },

        cv: (req, res) => {

            res.status(200).sendFile(path.resolve(__dirname + `./../public/romain_CV.pdf`));
            res.setHeader('Content-type', 'application/pdf');
        }





    };

    module.exports = mainController;