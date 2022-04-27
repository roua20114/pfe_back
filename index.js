const express=require('express')
const app=express()
const authRoute=require('./routes/auth')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')

const cors=require('cors')

const userRoute=require('./routes/user.routes')
const fieldRouters=require('./routes/field.routes');
const comRouters=require('./routes/comments.routes');
const offerRouters= require('./routes/offer.routes');
const testRoutes = require('./routes/test.routes');
const trainingRoutes= require('./routes/training.routes');
const msgRoutes= require('./routes/msg.routes');
const questionsRoutes= require('./routes/questions.routes');
const expRoutes= require('./routes/experience.routes');
const cvRoutes=require('./routes/cv.routes');
const contractRoutes=require('./routes/contract.routes');
const resRoutes=require('./routes/res.routes');
const candiRoutes=require('./routes/candidacy.routes');
const candidatRoutes=require('./routes/candidat.routes');
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>{
    console.log('connected')
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

app.use('/api/field', fieldRouters);

app.use('/api/comments',comRouters);

app.use('/api/candidat',candidatRoutes);

app.use('/api/offer', offerRouters);
app.use('/api/test',testRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/msg', msgRoutes);
app.use('/api/question', questionsRoutes);



app.use('/api/exp', expRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/contract', contractRoutes);
app.use('/api/res', resRoutes);
app.use('/api/candidacy', candiRoutes);

app.listen(5000, ()=>console.log('surver runing'))