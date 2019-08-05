const express = require('express');
const router  = express.Router();
const Comment = require('../models/comments');
const Dish = require('../models/dishes');

/* GET home page */
router.get('/', (req, res, next) => {
  
  res.status(200).json({hello: "world all comment here"} );
  

});

router.post('/addcomment', (req, res, next) => {
  const { rating , comment, author, dishid } = req.body;

  Comment.create({rating: rating, comment: comment, author: author})
  .then((commentx)=>{

      Dish.findByIdAndUpdate(dishid, { $push:{comments: commentx._id}})
      .then((response)=>{  res.json({response, commentx}) })
      .catch(err=>{ res.json(err)  });
  })
  .catch(err=>{ res.json(err)  });

  
});


module.exports = router;