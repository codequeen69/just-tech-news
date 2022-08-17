const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

//saying a user can have many posts
User.hasMany(Post,{
    foreignKey: 'user_id'
});
//saying post can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//these belongsToMany allow the User and Post to query each other's information in the context of a vote.
//we can now see which users voted on a single post and which posts a single user voted on.
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});



//why do we sometimes have to use curly brackets?
module.exports = { User, Post, Vote };