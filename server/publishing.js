Meteor.publish('entreprise', function() {
	console.log('Publication ...');
	console.log('nbr : ' + Entreprise.find().count() );
  	return Entreprise.find();
});
