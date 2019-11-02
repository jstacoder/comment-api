//import { ObjectType, Field, Schema } from 'graphene-js'
import { ID,Argument, Date as GrapheneDate, NonNull, ObjectType, InputObjectType, InputField, Field, Schema } from 'graphene-js';

import Comment from './models/Comment'
import Blog from './models/Blog'
import Post from './models/Post'
import { sequelize } from './db-init'
import { updateLocale } from 'moment';

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
    
    
    mutate(root, info, {input}){
        console.log('root', root)
        console.log('info', info)
        console.log('input', input)

    }
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

const schema = new Schema({
    query: Query, 
    mutation: Mutation
})

const getQuery = `
    query getPostComments($postId: ID!){
       getComments(postId: $postId){
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

const createBlogQuery = `
    mutation addBlog($input: BlogInput!){
        createBlog(input: $input){
            id
        }
    }
`

const createPostQuery = `
    mutation addPost($input: PostInput!){
        createPost(input: $input){
            id
        }
    }
`

const createCommentQuery = `
    mutation addComment($input: CommentInput!){
        createComment(input: $input){
            id
            text
            authorEmail
            date
        }
    }
`

const main = async () =>{
    if(process.env.INITIAL_DATA){
        await sequelize.sync()
        const blogVars = { input: { name: "my first blog"} } 
        const result = await schema.execute(createBlogQuery, null, null, blogVars)
        if(result){
            const {
                data: {
                    createBlog: {
                        id: blogId
                    } = {}
                } = {}
            } = result || {}
            if(!!blogId){
                const postVars = {input: { name: 'a new post', blogId} } 
                const postResult = await schema.execute(createPostQuery,null, null,  postVars)
                if(postResult){
                    const {
                        data: {
                            createPost: {
                                id: postId
                            } = {}
                        }
                    } = postResult || {}
                    if(!!postId){
                        const commentVars = {input: { text: 'awesome post', authorEmail: 'x@y.com', postId}}                        
                        const commentResult = await schema.execute(createCommentQuery, null, null,  commentVars)                    
                        console.log(JSON.stringify(commentResult, null, 2))                    
                    }
                }
            }
        }
    }else{
        var result = await schema.execute(getQuery, null, null, {postId: 5})
        console.log(JSON.stringify(result, null, 4))
    }
}

main()