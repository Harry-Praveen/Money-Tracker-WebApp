var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


const app= express()
app.use(bodyParser.json())
app.use(express.static('main'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/MoneyTracker')
var db = mongoose.connection
db.on('error', ()=> console.log("Database Connection Error"))
db.once('open', () => console.log("Database Connected Successfully"))

app.post("/save", (req,res) =>{
    var category = req.body.category
    var amount= req.body.amount
    var info = req.body.info
    var date = req.body.date

    var data={
        "Category": category,
        "Amount" : amount,
        "Info": info,
        "Date": date
    }
    db.collection('record').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")

    })
})
app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000)

console.log("Listening on port 3000")