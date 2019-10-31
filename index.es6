//import { ObjectType, Field, Schema } from 'graphene-js'
import { ID, ObjectType, Field, Schema } from 'graphene-js';

import Comment from './models/Comment'
import Blog from './models/Blog'
import Post from './models/Post'
import { sequelize } from './db-init'


const createInitialData = () => {
    return sequelize.sync().then(()=>{
        Blog.create({name: 'first blog'}).then(blog=>{
            Post.create({name: 'first post in first blog', blogId: blog.id}).then(post=>{
                post.addComment({text: 'this is an awesome post', postId: post.id, authorEmail: 'jstacoder@gmail.com', date: Date.now()})
                post.addComment({text: 'this is another awesome post', postId: post.id, authorEmail: 'jstacoder@gmail.com', date: Date.now()})
                post.addComment({text: 'this is even better', postId: post.id, authorEmail: 'jstacoder@gmail.com', date: Date.now()})
            })
        })
    })
}

@ObjectType()
class BlogType{
    @Field(ID) id
    @Field(String) name
}

@ObjectType()
class PostType{
    @Field(ID) id
    @Field(String) name
    @Field(BlogType) 
    blog(){
        return Blog.findOne({id: this.blogId})
    }
}


@ObjectType()
class CommentType{
    @Field(ID) id
    @Field(String) text
    @Field(String) authorEmail
    @Field(PostType) 
    post(){
        return Post.findOne({id: this.postId})
    }
    @Field(Date) date    
}

@ObjectType()
class Query {
    @Field(String)
    hello(){
        return "Jello"
    }
    @Field(CommentType, { args: { id: ID } })
    getComment({id}){
        return Comment.findByPk(id)
    }
    @Field([CommentType], { args: { postId: ID, blogId: ID}})
    getComments({postId, blogId}){
        if(!!postId){
            return Post.findByPk(postId).then(post=>  Comment.findAll({postId: post.id}))
        }
        if(!!blogId){
            return Blog.findByPk(blogId).then(blog=> blog.getPosts().then(posts=> posts.map(post=> Comment.findAll({postId: post.id}))))
        }
        return Comment.findAll()
    }
}

const schema = new Schema({query: Query})

const q = `
    {
       getComments(postId: 1){
        id    
        text
        authorEmail
        post {
            id
            name
            blog {
                id
                name
            }
          }
       }
    }
`

if(process.env.INITIAL_DATA){
    createInitialData()
}else{
    var result = schema.execute(q)
    result.then(res=> console.log(JSON.stringify(res, null, 4)))
}