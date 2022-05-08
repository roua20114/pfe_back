const express=require('express')
const app=express()
const authRoute=require('./routes/auth')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
let http=require('http')
let server = http.Server(app)
let socketIO=require('socket.io')
let io=socketIO(server)



const cors= require('cors')
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
const { use } = require('./routes/field.routes')
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>{
    console.log('connected')
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization','Auth-token','Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

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
app.use(fileUpload());


app.use('/api/exp', expRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/contract', contractRoutes);
app.use('/api/res', resRoutes);
app.use('/api/candidacy', candiRoutes);

app.listen(5000, ()=>console.log('surver runing'))
io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });
socket.on('message', (data) => {
    io.in(data.room).emit('new message', {user: data.user, message: data.message});
});
});


   


    


     
   
