//import { ObjectType, Field, Schema } from 'graphene-js'
import { ID,Argument, Date as GrapheneDate, NonNull, ObjectType, InputObjectType, InputField, Field, Schema } from 'graphene-js';

import Comment from './models/Comment'
import Blog from './models/Blog'
import Post from './models/Post'
import { sequelize } from './db-init'

@ObjectType()
class BlogType{
    @Field(ID) id
    @Field(String) name
}

@InputObjectType()
class BlogInput {
    @InputField(NonNull(String)) name
}

@ObjectType()
class CreateBlog{
    @InputField(NonNull(BlogInput)) input
    
    @Field(BlogType) blog
        
}

@ObjectType()
class PostType{
    @Field(ID) id
    @Field(String) name
    @Field(BlogType) 
    blog(){
        return Blog.findOne({where: {id: this.blogId}})
    }
}

@InputObjectType()
class PostInput{
    @InputField(String) name
    @InputField(ID) blogId
}


@ObjectType()
class CommentType{
    @Field(ID) id
    @Field(String) text
    @Field(String) authorEmail
    @Field(PostType) 
    post(){
        return Post.findOne({where: { id: this.postId}})
    }
    @Field(GrapheneDate) date    
}

@InputObjectType()
class CommentInput{
    @InputField(String) text
    @InputField(String) authorEmail
    @InputField(ID) postId
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
            return Post.findByPk(postId).then(post=>  Comment.findAll({where: {postId: post.id}}))
        }
        if(!!blogId){
            return Blog.findByPk(blogId).then(blog=> Post.findAll({where: { blogId: blog.id}}).then(posts=> posts.map(post=> Comment.findAll({where: {postId: post.id}}))))
        }
        return Comment.findAll()
    }
}



@ObjectType()
class Mutation{
    @Field(BlogType, { args: { input: NonNull(BlogInput)}}) 
    createBlog({input}){
        return Blog.create(input)
    }

    @Field(PostType, { args: { input: PostInput}})
    createPost({input}){
        return Post.create(input)
    }

    @Field(CommentType, { args: {input: CommentInput}})
    createComment({input}){
        return Comment.create({...input, date: new Date})
    }
}

export const schema = new Schema({
    query: Query, 
    mutation: Mutation
})
