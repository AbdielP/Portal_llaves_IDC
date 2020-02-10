var express = require('express');
var router = express.Router();

/* GET users listing. HOWARD*/
router.get('/keys', function(req, res, next) {
  var db = req.db;
  var collection = db.get('keys');
  collection.find({},{},function(e,llaves){
    res.json(llaves);
  });
});

// GET LLAVES DE BALBOA
router.get('/keysb', function(req, res, next) {
  var db = req.db;
  var collection = db.get('keysbal');
  collection.find({},{},function(e,llaves){
    res.json(llaves);
  });
});

//POST LLAVES HOWARD
router.post('/addkey',function(req,res){
  var db = req.db;
  var collection = db.get('keys');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
})

//POST LLAVES BALBOA
router.post('/addkeybal',function(req,res){
  var db = req.db;
  var collection = db.get('keysbal');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
})

//Borrar llaves HOWARD
router.delete('/deletekey/:id',function(req,res){
  var db = req.db;
  var collection = db.get('keys');
  var keyToDelete = req.params.id;
  collection.remove({ '_id' : keyToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});
//Borrar llaves BALBOA
router.delete('/deletekeybal/:id',function(req,res){
  var db = req.db;
  var collection = db.get('keysbal');
  var keyToDelete = req.params.id;
  collection.remove({ '_id' : keyToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

//Update llaves HOWARD
router.put('/updatekey/:id',function(req, res) {
	var data = req.body;
	var db = req.db;
	var collection = db.get('keys');
	var keyToUpdate = req.params.id;
	collection.update({'_id' : keyToUpdate}, {$set: data}, function(err, result){
		if(err){
			console.log(err);
		}
		res.send('Updated succesfully');
	});
});
//Update llaves BALBOA
router.put('/updatekeybal/:id',function(req, res) {
	var data = req.body;
	var db = req.db;
	var collection = db.get('keysbal');
	var keyToUpdate = req.params.id;
	collection.update({'_id' : keyToUpdate}, {$set: data}, function(err, result){
		if(err){
			console.log(err);
		}
		res.send('Updated succesfully');
	});
});

//Insertar racks en jaula HOWARD
router.put('/addrj/:id',function(req,res){
  var datarj = req.body;
  var db = req.db;
  var collection = db.get('keys');
  var rjToAdd = req.params.id;
  collection.update({'_id': rjToAdd},{$push : {'racks': {datarj}}},function(err,result){
    // collection.update({'_id': rjToAdd},{
    //   $push : {
    //     'racks': {
    //       rjid : new Objectid(),
    //       rjcodigo,
    //       rjnombre
    //     }
    //   }
    // },function(err){
    if(err){
      console.log(err);
    }
    res.send('Rack added succesfully')
  });
});
//Insertar racks en jaula BALBOA
router.put('/addrjbal/:id',function(req,res){
  var datarj = req.body;
  var db = req.db;
  var collection = db.get('keysbal');
  var rjToAdd = req.params.id;
  collection.update({'_id': rjToAdd},{$push : {'racks': {datarj}}},function(err,result){
    if(err){
      console.log(err);
    }
    res.send('Rack added succesfully')
  });
});

//Remover racks en jaula HOWARD
router.put('/deleterj/:id',function(req,res){
  var datarj = req.body;
  var db = req.db;
  var collection = db.get('keys');
  var rjToDelete = req.params.id;
  console.log(rjToDelete)
  collection.update({'_id': rjToDelete},
    {$pull : {'racks': {datarj}}},{multi: true},function(err,result){
    if(err){
      console.log(err);
    }
    res.send('Rack deleted succesfully')
    console.log(result)
  });
});

//Remover racks en jaula BALBOA
router.put('/deleterjbal/:id',function(req,res){
  var datarj = req.body;
  var db = req.db;
  var collection = db.get('keysbal');
  var rjToDelete = req.params.id;
  console.log(rjToDelete)
  collection.update({'_id': rjToDelete},
    {$pull : {'racks': {datarj}}},{multi: true},function(err,result){
    if(err){
      console.log(err);
    }
    res.send('Rack deleted succesfully')
    console.log(result)
  });
});

module.exports = router;