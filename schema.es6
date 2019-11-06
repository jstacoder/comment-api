//import { ObjectType, Field, Schema } from 'graphene-js'
import { ID,Argument, DateTime as GrapheneDateTime, NonNull, ObjectType, InputObjectType, InputField, Field, Schema } from 'graphene-js';

import Comment from './models/Comment'
import Blog from './models/Blog'
import Post from './models/Post'

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
    @Field(String) date
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

    @Field(BlogType, {args: {id: ID}})
    getBlog({id}){ 
        return  Blog.findByPk(id)
    }

    @Field(PostType, { args: { id: ID}})
    getPost({id}){
        return Post.findByPk(id)
    }
    @Field([BlogType])
    getBlogs(){
        return Blog.findAll()
    }

    @Field([PostType], { args: { blogId: ID}})
    getPosts({blogId}){
        if(!!blogId){
            return Blog.findByPk(blogId).then(blog=> Post.findAll({where: {blogId: blogId}}))
        }
        return Post.findAll()
    }
    @Field(CommentType, { args: { id: ID } })
    getComment({id}){
        return Comment.findByPk(id)
    }
    @Field([CommentType], { args: { postId: ID, blogId: ID}})
    getComments({postId, blogId}){
        if(!!postId){
            return Comment.findAll({where: {postId}})
        }
        if(!!blogId){
            return Post.findAll({where: { blogId }}).then(posts=> posts.map(post=> Comment.findAll({where: {postId: post.id}})))
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
        const now = new Date
        return Comment.create({...input, date: (new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toUTCString())})
    }
}

export const schema = new Schema({
    query: Query, 
    mutation: Mutation
})
