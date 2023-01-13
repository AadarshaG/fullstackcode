
const authRoute = require('./auth');
const productRoute = require('./products');
const userRoute = require('./users');

const adminRoute = require('./admin');

const router = require('express').Router();
const isLoggedIn = require('../app/middleware/isLoggedIn');
const isAdmin = require('../app/middleware/isAdmin');

const categoryRoute = require('../routes/category');

// middleware permission

router.use('/user',userRoute);
router.use('/auth',authRoute);


router.use('/admin',[isLoggedIn,isAdmin], adminRoute);
router.use('/category',[isLoggedIn,isAdmin],categoryRoute);
router.use('/product',[isLoggedIn,isAdmin],productRoute);
router.use('/user', userRoute);


module.exports = router;