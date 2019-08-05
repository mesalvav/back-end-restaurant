const express = require('express');
const router  = express.Router();
const Dish = require('../models/dishes')
const uploadCloud = require('../config/cloudinary-setup.js');

/* GET home page */
router.get('/', (req, res, next) => {
    Dish.find()
    .then( dishesList =>{
      res.status(200).json(dishesList );
    })
    .catch(err =>{
      console.log(err);
    })

});

router.post('/uploadnewdish', uploadCloud.single('photo'), (req,res,next) => {
  
  console.log('line 12 post upload: ' + JSON.stringify( req.body));
  const { 
    name,
    description,
    category,
    label,
    price,
    featured
  } = req.body;
      const image = req.file.url;

  const newDish = 
    new Dish({name, 
              description, 
              image,
              category, 
              label,
              price,
              featured});

newDish.save()
      .then(dish =>{

        res.status(200).json({ result: " saved & uploaded dish here"});
      })
      .catch(err => { console.log("err is " + err)})
})

module.exports = router;