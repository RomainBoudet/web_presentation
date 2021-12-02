const mainController = {


        test: (req, res) => {

            console.log('Hello World');
            res.status(200).send("Hello world !! ");


        }





    };

    module.exports = mainController;