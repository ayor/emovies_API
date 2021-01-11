/**************Import Starts**************************/
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const { MONGODB_URI } = require('./mongo-db');
const videoRoutes = require('./routes/video-route');
const customerRoutes = require('./routes/customer-routes');
const adminRoutes = require('./routes/admin-route');
const authRoutes = require('./routes/auth-route');
/*****************Import ends*********************************/
const app = express();
/*****************Set headers*********************************/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, POST');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
/*****************End setting of headers******************************/
/*****************Handle incoming images******************************/
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (erq, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const filter = (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' ||
        file.mimetype !== 'image/jpg' ||
        file.mimetype !== 'image/png') {
        cb(null, false);
    }
    cb(null, true)
};
app.use(multer({
    storage: fileStorage,
    fileFilter: filter
}).single('Image'));
/*****************End******************************/

/*****************Set up api to parse JSON data********/
app.use(bodyparser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
/*****************end*********************************/

/*****************Routing*********************************/
app.use('/api', videoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/customer', customerRoutes);


/*****************Routing ends*********************************/
/*****************Error handling*********************************/

app.use((error, req, res, next) => {

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message,
        data
    })
})


/*****************Connect to mongodb atlas using mongoose database*********************************/
mongoose.connect(
    MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("connected to database");
        app.listen(8080);
    })
/*****************Connection ends*********************************/