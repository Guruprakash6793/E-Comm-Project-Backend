const express = require('express');
const cors= require ('cors');
const multer  = require('multer')
///////////////////////////////////////////
const app = express();
const PORT = 4000;
//////////////////////////////////////////////
const fs= require('fs');
const path=require('path')
///////////////////////////////////////////
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient
///////////////////////////////////////////
app.use(express.json())
app.use(cors())

const connectDB =async ()=>{
  try{
    await mongoose.connect("mongodb+srv://guruprakashg:Indi%40%40123@cluster0.x1q0v8s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{});
    console.log("db connected")
         
  }
  catch(error){
    console.log(error)
  }
  
}
//////////////////////////////////////////
  app.get('/',(req,res)=>{
   res.send("its working don't worry")
})
////////////////////////////////////////


// dashboard revenue collection

app.get("/revenue/Dashboard", async (req,res)=>{

    
    const client = await MongoClient.connect(
      'mongodb://localhost:27017/'
    ); 
    const coll = client.db('clothstore').collection('salesdetails');
    const cursor = coll.find();
    const result = await cursor.toArray();
    await client.close();   
        res.json({data : result})    
    }) 

    // profit chart
    app.get("/profit/profitchart", async (req,res)=>{

    
      const client = await MongoClient.connect(
        'mongodb://localhost:27017/'
      ); 
      const coll = client.db('clothstore').collection('salesdetails');
      const cursor = coll.find();
      const result = await cursor.toArray();
      await client.close();   
          res.json({data : result})    
      }) 
    //sales analytics 

 const Sales = mongoose.model("salesdetails",new mongoose.Schema({
    date:Date,
    salesrevenue: Number,
    costofgoods : Number,
    grossprofit : Number
 }))   

 app.post("/api4/salesanalytics",async(req,res)=> {
  const newSales = new Sales(req.body);
  const saveSales = await newSales.save();
  res.send(saveSales);
 })
 app.get("/api4/salesanalytics", async (req,res)=>{

 const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
); 
const coll = await client.db('clothstore').collection('salesdetails');
const cursor = await coll.find();
const result = await cursor.toArray();
await client.close();


    res.json({data : result})
    
}) 

// Order Processing 

app.get("/api3/orderstatus",async (req,res)=>{

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = await client.db('clothstore').collection('Orders');
const cursor = await coll.find();
const result = await cursor.toArray();
await client.close();
res.json({data : result})
})

// Inventory managing

const Invents = mongoose.model("inventories",new mongoose.Schema({
    date: Date,
    category: String,
    quantity: Number,
    purchaseprice: Number,
    totalamount: Number,
    stocks: Number
}))

app.post("/api2/inventory",async(req,res)=>{
  const newInvents = new Invents(req.body);
  const saveInvents = await newInvents.save();
  res.send(saveInvents);
})

app.get("/api2/inventory",async (req,res)=>{



const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('clothstore').collection('inventories');
const cursor = coll.find();
const result = await cursor.toArray();
await client.close();
res.json({data:result})
})

//product managing
const Product = mongoose.model(
  "productlist",
  new mongoose.Schema({
      
      title:String,
      description:String,
      image:String,
     
  })
  );

  app.post("/api1/productlists",async (req,res) =>{
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
}
)

app.get("/api1/productlists",async (req,res) =>{
 


const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('clothstore').collection('productlists');
const cursor = coll.find();
const result = await cursor.toArray();
await client.close();
res.json({data:result})
})








connectDB()
app.listen(PORT,()=>{
    console.log("server connected sucessfully")
})




