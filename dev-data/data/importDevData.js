/* eslint-disable no-console */
//node dev-data/data/importDevData.js --import
//node dev-data/data/importDevData.js --delete
//导入前要禁用userModel的密码加密
//所有的user密码都是user1234
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

//这里可以更换成导入本地数据库的connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfully!');
  });

//读取被解析本地的数据
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  //运行完退出
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//process.argv是输入的命令，被解析成一个数组，需要上传数据或者删除数据时，输入node dev-data/data/importDevData.js --import
//console.log(process.argv)会显示被解析为数组的argv，被解析的数组是这样的：argv[0]代表Node，argv[1]代表本文件，argv[2]代表选项，选项通过下面的if else进行判断
/*
[
  '/usr/local/bin/node',
  '/Users/liujiawei/Desktop/回存到NAS/IT 课程/Node.js Course/4-natours/starter/dev-data/data/importDevData.js',
  '--import'
]
*/

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
