const express=require("express")
const port=8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded())

const checkage=require('./middleware/age');

app.get('/',(req,res)=>{
    return res.render("home");
})
app.get('/about',(req,res)=>{
    return res.render("about");
})
app.get('/blog',checkage,(req,res)=>{
    return res.render("blog");
})
app.get('/product',(req,res)=>{
    return res.render("product");
})
app.get('/contact',(req,res)=>{
    return res.render("contact");
})



app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server running on port`+port);
})