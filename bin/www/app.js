const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const AWS = require('aws-sdk');
require('dotenv').config();

const ProfileRouter = require('../../Routers/ProfileRouter');
const ListRouter = require('../../Routers/ListRouter');
const PlaceRouter = require('../../Routers/PlaceRouter');
const CommentRouter = require('../../Routers/CommentRouter');
const MemberRouter = require('../../Routers/MemberRouter');
const ActivityRouter = require('../../Routers/ActivityRouter');
const FriendRouter = require('../../Routers/FriendRouter');
const PlaceInListRouter = require('../../Routers/PlaceInListRouter');
const FavoriteRouter = require('../../Routers/FavoriteRouter');
const PostRouter = require('../../Routers/PostRouter');
const LikesRouter = require('../../Routers/LikesRouter');
const PostCommentRouter = require('../../Routers/PostCommentRouter');

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
app.use('/api/v1/notifications/', FavoriteRouter)
app.use('/api/v1/posts/', PostRouter)
app.use('/api/v1/likes/', LikesRouter)
app.use('/api/v1/postComments/', PostCommentRouter)

module.exports = app;