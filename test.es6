import { sequelize } from './db-init'
import { schema } from './schema'


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
        var result = await schema.execute(getQuery, null, null, {postId: 1})
        console.log(JSON.stringify(result, null, 4))
    }
}

main()