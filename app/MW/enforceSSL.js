const redirectUrl = (req, res) => {
	if (req.method === "GET") {
		res.redirect(301, "https://" + req.headers.host + req.originalUrl);
	} else {
		res.status(403).send("Hé... tu crois pas que ce serais plus sympa d'envoyer ça en HTTPS.. ? 😉");
	}
};

const enforceHTTPS = () => {

	return function(req, res, next) {

		const isHttps = req.secure;

		if (isHttps) {
			next();
		} else {
            // si on est pas en https, on redirige !
            console.log("Une requete en HTTP va être convertie en HTTPS !")
			redirectUrl(req, res);
		}
	};

};

module.exports = enforceHTTPS;


