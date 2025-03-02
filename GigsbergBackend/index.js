const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/domain-models/');
const productRoutes = require('./routes/domain-routes/productRoute');
console.log("hey");
const userRoute = require('./routes/auth-routes/userRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors');
const {mongoose} = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow your React app to make requests
    methods: 'GET,POST,PUT,DELETE',   // Methods you want to allow
    credentials: true,                // Allow cookies if needed
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorMiddleware);

// Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoutes);
app.use("/", (req, res) => {
    res.status(404).json({
        message: 'Invalid URI',
    })
});


// Connect to databases
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const mongoUri = process.env.MONGO_URI;
console.log(mongoUri);
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error: ', err);
    });

sequelize.sync({ alter:  true }).then(() => {
    console.log('Database synced');
}).catch(err => console.log('Error syncing database:', err));

const port= process.env.PORT || 3003;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
