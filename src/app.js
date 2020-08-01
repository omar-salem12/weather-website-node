const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast =  require('./utils/forecast');

const app = express();

// Define paths for Express config
const pathOfDirectoryPublic = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pathOfDirectoryPublic));


app.get('', (req, res)=>{
    res.render("index",{
        title:"Weather ",
        name:'omar salem'
    });
});

////////////////////////////////////////////////////

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About Me',
        name:'omar salem'
    });
})

app.get('/help',(req,res)=>{

    res.render('help',{
        helpText:'this  some helpful text.',
        title:'let me help you!',
        name:'omar salem'
    })

})
app.get('/weather',(req,res)=> {
    if(!req.query.address) {
        return res.send({
            error:"you must provide a search term"
        }) 
    }

     geocode(req.query.address,(error,data )=>{
         if(error){
            return  res.send({
                 error:error
             }) 
         }
         forecast( data.latitude, data.longitude, (error, forecastData)=>{
             
            if(error) {
                return res.send({
                    error
                })
            }
           
             res.send({
                 forecast:forecastData,
                 address:req.query.address
             })

         }) // end forcast callback function.

     }) // end geocode callback function.

   
})



app.get('/products',(req,res)=>{
    console.log(req.query)
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'omar',
        errorMessage:'Help artivle not found.'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'omar',
        errorMessage:'page not found.'
    })
})
app.listen(3000,()=>{
     console.log('seve is run!');
})