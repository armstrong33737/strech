document.getElementById('contact').addEventListener("submit", function(e){
	e.preventDefault();
	envoieMail("contact");
});

//  formulaire de paiemaent 
var paiemaent;
var delais;
form = document.forms['formPrice'];
function updateForm(formulaire, forfait,montant, prixPaypal, del){
	const f = document.getElementById('titleForm');
	const p = document.getElementById('amountForm');
	f.innerHTML = forfait;
	p.innerHTML = montant;
	document.getElementById("paypal-button-container").innerHTML  = "";
	paypal.Buttons({
		createOrder: function(data, actions){
			return actions.order.create({
				purchase_units:[{
					amount:{
						value: prixPaypal
					},
				}]
			});
		},
		onApprove: function(data, actions){
			return actions.order.capture().then(function(details){
				paiemaent = 1;
				delais = del;
				alert ("Transaction ok:"+details.payer.name.given_name);
			})
		},
		onError: function (err){
			console.error("Payment error:",err);
			alert("Echec du paiemaent!");
		}
	}).render("#paypal-button-container");
}

//fonction de traduction

function valider(){
	form = document.forms['formPrice'];
	if (form.nom.value != "" & form.email.value != "" & form.secteur.value != "" & paiemaent != 1 ){
		document.getElementById('commander').disabled = false;
	}else {
		document.getElementById('commander').disabled = true;
	}
}

document.getElementById("commander").addEventListener('click', function(){
	(function () {
		emailjs.init({
			publicKey: "ZjG0GbvG3bmh8JjbS",
		});
	})();
	var templateParams = {
		title: "Strech Nouvelle commade",
		name: form.nom.value,
        sacteur: form.secteur.value,
        couleurs: form.couleurs.value,
        type: form.type.value,
		message: form.description.value,
		email: form.email.value,
	};
	emailjs.send('service_zda99rr', 'template_7nhrdpk', templateParams).then(
		(response) => {
			alert("Votre commande à été soumise avec succès. nous vous contacterons dans "+delais+" pour la premmièrre livraison");
            form.submit();
		},
		(error) => {
			console.log('FAILED...', error);
			alert("Echec lors de l'envoie du Mail !. veullez nous contacter via le formulaire de contact pour vos differentes préocupations")
		},
	);
	
});

// formulaire de contact
function envoieMail(formulaire){
	const form = document.forms[formulaire];
	(function () {
	emailjs.init({
		publicKey: "ZjG0GbvG3bmh8JjbS",
	});
	})();
	var templateParams = {
		title: "Strech Requette de logo",
		name: form.name.value,
		message: form.message.value,
		email: form.email.value,
	};
	emailjs.send('service_zda99rr', 'template_7nhrdpk', templateParams).then(
		(response) => {
			alert("Votre requette à été envoyer avec succès. nous vous contacterons dns de bref delais ")
		},
		(error) => {
			console.log('FAILED...', error);
			alert("echec de l'envoie du Mail ");
		},
	);
}
