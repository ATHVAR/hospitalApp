
const fs = require('fs');
const express=require('express');
const app=new express();
const morgan=require('morgan');
const api=require('./routes/sample');
app.use('/api',api);
require('dotenv').config();
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
 });
