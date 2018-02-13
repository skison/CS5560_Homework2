var Note = require('mongoose').model('Note');
//console.log('loaded Note model: ' + Note);

exports.create = function(req, res, next) {
	console.log('Creating note!');
	var note = new Note(req.body);
	console.log('Created new note var! ' + note);
	note.save(function(err) {
		if(err){
			console.log('Error creating note!');
			return next(err);
		}else{
			console.log('Was able to create note!');
			//res.json(note);
			//now render the page as if it was a GET request
			exports.list(req, res, next);
		}
	});
};

exports.list = function(req, res, next) {
	/*first, check if we should delete a note*/
	if(req.query.deleteid)
	{
		console.log('Need to delete a note!');
		deleteNote(req.query.deleteid);
	}
	console.log('Finding notes!');
	Note.find({}, function(err, notes) {
		if(err){
			console.log('Error finding notes!');
			return next(err);
		}else{
			console.log('Found notes, now returning!');
			//res.json(notes);
			res.render('notes', {
				title: 'Note Tracker',
				noteList: notes
			})
		}
	});
};

/*This is my quick, probably unsafe delete function*/
function deleteNote(noteID){ 
	console.log('Going to delete note with id ' + noteID);
	Note.find({"_id": noteID}).remove().exec();
}