import express from 'express';
import dotenv from 'dotenv';
import router from './Routes/careerRoute.js';
import userRouter from './Routes/userRoute.js';
import connectionDb from './connect/database.js';
import errorHandler from './middleware/errorMiddleware.js';
import path from 'path'; // Import path module for directory handling

const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config();
connectionDb();

// Get the directory name from the URL
const __dirname = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory for your views
app.set('views', path.join(__dirname, '../frontend/views')); // Adjust path as necessary

// Serve static files (like CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/careers/', router);
app.use('/api/users/', userRouter);

// Example route to render an EJS view
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    res.render('wwww');
});

app.get('/findProgrm', (req, res) => {
    res.render('4AlevelGrades');
});

app.get('/dash',(req,res)=>{
    res.render('Dashboard');
})

app.get('/register',(req,res)=>{
    res.render('Register');
})

app.get('/Programs', (req, res) => {
    res.render('Programs');
});

// careers
app.get('/careers',(req, res) => {
    res.render('Career');
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server has started running at http://localhost:${PORT}`);
});