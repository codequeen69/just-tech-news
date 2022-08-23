const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    //res.render specifies which template we want to use. the handlebars exprension is implied
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id= vote.post_id)'), 'vote_count']
        ],
        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>{
        //this loops over and maps each Sequelize object into a serilaized version of itself,
        //saving  the results in a new Posts array then we plug posts into the template
        const posts = dbPostData.map(post => post.get({plain:true}));
        //pass a single post object into the homepage template the .get() method
        //allows up to the only the properties we need from the sequelize object
        console.log(dbPostData[0]);
        //the render method can take arrays but we'll add the posts array to an object
        //so that we can add other properties to the template later on this temporarily breaks the 
        //template bc we set it up to recieve id and title etc so we have to use handlebars helpers in homepage
        res.render('homepage',{
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res)=>{
   Post.findOne({
       where:{
           id: req.params.id
       },
       attributes:[
           'id',
           'post_url',
           'title',
           'created_at',
           [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id= vote.post_id)'), 'vote_count']
       ],
       include:[
           {
               model:Comment, 
               attributes:[ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
               include:{
                   model:User,
                   attributes:['username']
               }
           },
           {
               model: User,
               attributes:['username']
           }
       ]
   })
   .then(dbPostData =>{
       if(!dbPostData){
           res.status(404).json({message: 'No post found with this id'});
           return;
       }
       //serialize the data
       const post = dbPostData.get({plain: true});

       //pass the data to the template
       res.render('single-post',{
        post,
        loggedIn: req.session.loggedIn
       });
    })
   .catch(err=>{
       console.log(err);
       res.status(500).json(err);
   });
});

router.get('/login', (req, res) =>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;