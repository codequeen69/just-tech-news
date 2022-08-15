const User = require('./User');
const Post = require('./Post');

//saying a user can have many posts
User.hasMany(Post,{
    foreignKey: 'user_id'
});
//saying post can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
})




//why do we sometimes have to use curly brackets?
module.exports = { User, Post };