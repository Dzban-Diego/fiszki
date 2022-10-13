const db = require('../models/app');

const test = (req,res) => {
    res.send({log: 'API rotute test positive'})
}

/* add new word by post request */
const add = (req,res) => {
    const newword = new db({
        en: req.body.en,
        pl: req.body.pl,
        es: req.body.es,
        category: req.body.cat,
    });

    newword.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

/* Gett all record from DB */
const get = (req,res) => {
    db.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
}


/* Get one random record from DB */
const postGet = (req,res) => {
    var category = req.body.data
    if(category == 'WSZYSTKIE' || category == ''){
        db.find()
            .then(result => res.send(result))
            .catch(err => console.log(err))
    }else{
        db.find({category: category})
            .then(result => res.send(result))
            .catch(err => console.log(err))
    }
}

const getOne = (req,res) => {
    db.countDocuments()
        .then(count => {
            var random = Math.floor(Math.random() * count)

            db.findOne().skip(random)
            .then(result => {
                 res.send(result)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

const deleteword = (req,res) => {
    const id = req.params.id
    db.findByIdAndDelete(id)
        .then(() => res.send({status: 'deleted'}))
        .catch(err => console.log(err))
}

/* Edit record by post */
const edit = (req,res) => {
    const updateword = {
        en: req.body.en,
        pl: req.body.pl,
        es: req.body.es,
        category: req.body.cat,
    }

    db.findByIdAndUpdate(req.body.id,updateword,function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            res.send(docs)
        }
    })
}

/* Get categories */
const categories = (req,res) => {
    db.find()
        .then(result => {
            var categories = []

            /* Get category from every record */
            for(const word of result){
                categories.push(word.category)
            }

            /* Filtr categories, dubble delete */
            const uniq = (a) => {
                var seen = {};
                return a.filter(function(item) {
                    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
                });
            }


            const uniqcategories = uniq(categories)
            var allcount = 0
            var resultCAT = []
            for(const i of uniqcategories){
                db.countDocuments({category: i})
                    .then(count => {
                        allcount = allcount + count
                        resultCAT.push(i + '(' + count + ')')
                        if(resultCAT.length === uniqcategories.length){
                            resultCAT.unshift('WSZYSTKIE(' + allcount + ')')
                            res.json(resultCAT)
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
}

const POSTcategories = (req,res) => {
    db.find({category: req.body.data})
        .then(result => res.send(result))
        .catch(err => console.log(err))
}

const POSTtranslate = (req,res) => {
    var unirest = require("unirest");
    const data = req.body

    var req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");

    req.headers({
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": "7ad18b7879mshe940f532c3bad18p1755d0jsn8c2f17dc2b5b",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "useQueryString": true
    });

    req.form({
        "q": data.data,
        "source": data.Fromlang,
        "target": data.Destlang,
    });

    
    req.end(function (dd) {
        if (dd.error){ 
            throw new Error(dd.error)
        }else{
            res.send(dd.body.data.translations[0]);
        }
    })
}

module.exports = {
    test,
    add,
    get,
    deleteword,
    edit,
    categories,
    POSTcategories,
    getOne,
    postGet,
    POSTtranslate,
}