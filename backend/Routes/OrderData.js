const express = require("express");
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderData', async (req, res)=>{
    let data = req.body.order_data;
    //console.log(data);
    await data.splice(0, 0, {order_date: req.body.order_date})
    console.log(data);


    //if emaoil not existing in db then create else Insertmany()
    let eId = await Order.findOne({ 'email':req.body.email})
    console.log(eId);
    if (eId ===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({ success: true})
            })
        }catch(err){
            console.log(err)
            res.send("Server Error", err.messege)
       
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push: {order_data: data}}).then(()=>{
                    res.json({ success:true })
                })
        }catch (err){
            res.send("Server Error", err.messege)
        }
    }
});

router.post("/myOrders", async (req, res)=>{
    try{
        let mydata = await Order.findOne({"email": req.body.email})
        res.json({orderData:mydata})
        //console.log(mydata);
    }catch(err){
        res.send("Server error ", err.messege)
    }
})

module.exports = router;