const express = require('express')
const app = express()
 
app.use(express.json())
const port = 3000
const mongoose = require('mongoose');

 const dbConnect =async()=>{
    const connected= await mongoose.connect('mongodb://127.0.0.1:27017/Mongodata');
    if(connected){
        console.log("connected to mongodb")
    }else{
        console.log("Db connection error")  
    }
 }
 dbConnect();


//define shape of User using mongoose.schema

const userSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  address: String,
});

//create model using schema
const Users = mongoose.model('Users', userSchema);


const users=[
    
    {id:1, name:"ram"},
    {id:2,name:"Hari" },
    {id:3,name:"Nisha", address:"mnr" }
]
 app.get('/users', (req, res) => {
const searchList = users.filter((item,id)=>{
if(item.name[0] === req.query.startswith && item.name[item.name.length-1] === req.query.endswith){
return item
 }
 })
res.send(searchList)
})
 
app.get('/users/:id', (req, res) => {
const filterList = users.filter((item,id)=>{
if(item.id == req.params.id){
return item
 }
 })
res.send(filterList)
})
 
app.post('/register',async (req, res) => {
  const data= await Users.create(req.body)
  if(data){
    res.json({message:"new data created"})
  }
  else{
    res.json({message:"error occur"})
  }
})

app.get('/users',async (req, res) => {
   const userlist=await Users.find()
   if(userlist){
res.json({userlist})
   }
   else{
    res.json({message:"cannot find"})
   }
 })
 
app.patch('/users-address/:id', (req, res) => {
    const editlist=users.map((item,id)=>{
        if(item.id==req.params.id){
            item.address=req.body.address
        }
        return item
    })
    res.json(editlist)
})



app.delete('/users/:id',async (req, res) => {
await Users.findByIdAndDelete(req.params.id)
})


// app.delete('/users/:id', (req, res) => {
//     const editlist=users.filter((item,id)=>{
//         if(item.id!=req.params.id){
//             return item 
//         }
        
//     })
//     res.json(editlist)
// })

app.put('/users/:id',async (req, res) => {
   // console.log(req.params.id,req.body)
    await Users.findByIdAndUpdate(req.params.id,req.body)
})
        


// app.put('/users/:id', (req, res) => {
//     const editlist=users.map((item,id)=>{
//         if(item.id==req.params.id){
//             item=req.body
//         }
//         return item
//     })
//     res.json(editlist)
// })



app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
