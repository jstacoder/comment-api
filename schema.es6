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
    @Field(String) dateAdded
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
    async getBlog({id}){ 
        return await Blog.findByPk(id)
    }

    @Field(PostType, { args: { id: ID}})
    async getPost({id}){
        return await Post.findByPk(id)
    }
    @Field([BlogType])
    async getBlogs(){
        return await Blog.findAll()
    }

    @Field([PostType], { args: { blogId: ID}})
    async getPosts({blogId}){
        if(!!blogId){
            const blog = await Blog.findByPk(blogId);
            return await Post.findAll({ where: { blogId: blogId } });
        }
        return await Post.findAll()
    }
    @Field(CommentType, { args: { id: ID } })
    async getComment({id}){
        return await Comment.findByPk(id)
    }
    @Field([CommentType], { args: { postId: ID, blogId: ID}})
    async getComments({postId, blogId}){
        if(!!postId){
            return await Comment.findAll({where: {postId}})
        }
        if(!!blogId){
            const blogPosts = await Post.findAll({where: { blogId }})
            return blogPosts.map(async post=> await Comment.findAll({where: {postId: post.id}}))
        }
        return await Comment.findAll()
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
        return Comment.create({...input})
    }
}

export const schema = new Schema({
    query: Query, 
    mutation: Mutation
})
