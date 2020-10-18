const express = require("express");
const router = express.Router();

//Item mODEL
const Item = require("../../models/item");

// @route GET api/items
// @desc Get All items
// @acsess Public 

router.get('/',(req,res)=> {
   Item.find()
   .sort({at:1}) 
   .then(items=>res.json(items))
});

// @route POST api/items
// @desc create a post
// @acsess Public

router.post('/',async (req,res)=> {
    console.log(req.body);
    try {
     const eachItem = await Item.create({
         itemName:req.body.name,
         itemPlace:req.body.place,
     })
     res.status(200).json(eachItem)
    }
    catch(e){
          console.log(e);
    }
 });

// @route DELETE api/items
// @desc delete a post
// @acsess Public

router.delete('/:id',async (req,res)=> {
    try {
    const deleteItem = await Item.findById(req.params.id);
    await deleteItem.remove();
    res.json({success:true});
    }
    catch(e){
     res.status(400).json({success:false})    
    }
 });


module.exports = router;