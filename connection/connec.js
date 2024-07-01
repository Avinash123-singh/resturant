const mongoose = require ('mongoose')

//function for mongodb database connection

mongoose.connect("mongodb+srv://avinashresturant:avinashfood@cluster0.wypxris.mongodb.net/resturant?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("connected")).catch(err => {
    console.log(err, "err")
})