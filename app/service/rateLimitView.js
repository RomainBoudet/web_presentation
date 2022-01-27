const rateLimitView = () => {
const view = `<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="keywords"
      content="romain boudet, développeur web, développeur, développeur montpellier, développeur javascript, montpellier ">
    <meta name="description"
      content="Portfolio Romain Boudet, Développeur Web, Développeur à Montpellier, a la recherche d'un emploi">
    <!-- Reset CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Romain BOUDET - Développeur Backend </title>

    <link rel="shortcut icon" type="images/ico" href="/images/RB.png" />

</head>

<body>
    <a href="https://romainboudet.fr" target="_blank"><img
            style=" position: absolute; z-index: 2000; top: 10px; left: 10px; border: 0; width: 100px; "
            src="https://filedn.eu/lD5jpSv048KLfgLMlwC2cLz/RB.png" alt="logo RB"></a>


    <header style="background-color: rgb(73, 43, 43);"
        class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 text-white border-bottom shadow-sm">
        <h1 class="h5 my-0 mr-md-auto font-weight-normal"></h1>
        <nav id="navbar" class="navbar header navbar-inverse navbar-fixed-top align-items-center">
            <a class="p-2 text-white" href="https://romainboudet.fr#presentation">Qui suis-je ?</a>
            <a class="p-2 text-white" href="https://romainboudet.fr#projets">Portfolio</a>
            <a class="p-2 text-white" href="https://romainboudet.fr#Contact">Contact</a>
            <a class="p-2 text-white" href="https://romainboudet.fr#resume">CV</a>
        </nav>
    </header>
    <main class="container">

        <h4>Bonjour,</h4> <br>
        <p>Vous avez dépassé les 5 envois d'emails autorisé par jour.</p> <br>
        <p> Si vous souhaitez néanmoins envoyer un nouvel email, merci de rééssayer dans 12h. <p> 
        <p>Bonne journée.</p> <br>
        <p>L'administrateur du site <a href="https://romainboudet.fr">romainboudet.fr</a> .</p> 
        
        <br>
    </main>

    <footer class="pt-4 my-md-5 pt-md-5 border-top">
        <div class="row">
            <div class="col-12 col-md text-center">
                <small class="d-block mb-3 text-muted">Romain - Boudet © 2022</small>
            </div>
        </div>
    </footer>
</body>
</html>`
    return view;

};
module.exports = {
    rateLimitView
};