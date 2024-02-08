const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const AWS = require('aws-sdk');
require('dotenv').config();

const connection = require('../utils/AwsDbConnect'); // Adjust the path as necessary
const ProfileRouter = require('../../Routers/ProfileRouter');
const ListRouter = require('../../Routers/ListRouter');
const PlaceRouter = require('../../Routers/PlaceRouter');
const CommentRouter = require('../../Routers/CommentRouter');
const MemberRouter = require('../../Routers/MemberRouter');
const ActivityRouter = require('../../Routers/ActivityRouter');
const FriendRouter = require('../../Routers/FriendRouter');
const PlaceInListRouter = require('../../Routers/PlaceInListRouter');
const FavoriteRouter = require('../../Routers/FavoriteRouter');

const app = express();

app.use(cors());      
app.use(helmet());      
app.use(morgan('common')); 
app.use(express.json()); 

app.use('/api/v1/activity/', ActivityRouter)
app.use('/api/v1/comments/', CommentRouter)
app.use('/api/v1/profiles/', ProfileRouter);
app.use('/api/v1/lists/', ListRouter)
app.use('/api/v1/places/', PlaceRouter)
app.use('/api/v1/members/', MemberRouter)
app.use('/api/v1/friends/', FriendRouter)
app.use('/api/v1/placeinlist/', PlaceInListRouter)
app.use('/api/v1/favorites/', FavoriteRouter)

module.exports = app;