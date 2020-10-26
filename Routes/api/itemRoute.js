const express = require("express");
const router = express.Router();

//Item mODEL
const List = require("../../models/item");

// @route GET api/items
// @desc Get All items
// @acsess Public 

router.get('/:id',async(req,res)=> {
  /* */
  const { id } =req.params
  try{
  const eachList = await List.findOne({ user:id})
  res.json(eachList.items);
  }
  catch(e){
      console.log(e);
  }

});

// @route POST api/items
// @desc create a post
// @acsess Public

router.post('/',async (req,res)=> {
   /*  */
   const {itemName , place , id } =req.body
    try{
    const eachList = await List.findOne({ user:id})
    eachList.items.push({itemName,place})
    eachList.markModified(eachList.items);
    console.log(eachList);
    await eachList.save()
    res.json(eachList.items);
    }
    catch(e){
        console.log(e);
    }
 });

// @route DELETE api/items
// @desc delete a post
// @acsess Public

router.delete('/:id/:authID',async (req,res)=> {
  console.log(req.params)
  const {authID , id } = req.params;
  try{
    const getDoc = await List.findOne({user:authID});
   const indexToDelete = getDoc.items.findIndex(item =>item._id == id);
    console.log(indexToDelete);
    getDoc.items.splice(indexToDelete,1);
    if(getDoc.items.length == 0){
      getDoc.items.set();
      await getDoc.save();  
      res.status(200).json(id)
    }
    else {
    getDoc.markModified(getDoc.items);
    await getDoc.save();
    res.status(200).json(id)
    }
  }
  catch(e){
      console.log(e);
  }
 });


module.exports = router;