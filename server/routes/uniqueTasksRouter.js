const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const humps = require('humps');
const camelizeKeys = humps.camelizeKeys;
const jsonParser = require('body-parser').urlencoded({extended:true});
// const agent = require ('superagent');

router.get('/unique', (req,res)=>{

    knex('unique_tasks')
    .then((rows)=> res.send(camelizeKeys(rows)))
    .catch((err)=> next(err));
});



router.post('/unique', jsonParser, (req, res, next)=>{
    console.log(req.body);
    return knex('unique_tasks')

    .insert(req.body)
    .then(()=>{
        res.send(req.body);
        console.log(res.status);
    })
    .catch((err)=>next(err))
    ;
});
module.exports = router;
