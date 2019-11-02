"use strict";

var _grapheneJs = require("graphene-js");

var _Comment = _interopRequireDefault(require("./models/Comment"));

var _Blog = _interopRequireDefault(require("./models/Blog"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _dbInit = require("./db-init");

var _moment = require("moment");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _dec4, _dec5, _class4, _class5, _descriptor3, _temp2, _dec6, _dec7, _dec8, _class7, _class8, _descriptor4, _descriptor5, _temp3, _dec9, _dec10, _dec11, _dec12, _class10, _class11, _descriptor6, _descriptor7, _temp4, _dec13, _dec14, _dec15, _class13, _class14, _descriptor8, _descriptor9, _temp5, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class16, _class17, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp6, _dec22, _dec23, _dec24, _dec25, _class19, _class20, _descriptor14, _descriptor15, _descriptor16, _temp7, _dec26, _dec27, _dec28, _dec29, _class22, _class23, _dec30, _dec31, _dec32, _dec33, _class24, _class25;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

let BlogType = (_dec = (0, _grapheneJs.ObjectType)(), _dec2 = (0, _grapheneJs.Field)(_grapheneJs.ID), _dec3 = (0, _grapheneJs.Field)(String), _dec(_class = (_class2 = (_temp = class BlogType {
  constructor() {
    _defineProperty(this, "id", _initializerWarningHelper(_descriptor, this));

    _defineProperty(this, "name", _initializerWarningHelper(_descriptor2, this));
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
let BlogInput = (_dec4 = (0, _grapheneJs.InputObjectType)(), _dec5 = (0, _grapheneJs.InputField)((0, _grapheneJs.NonNull)(String)), _dec4(_class4 = (_class5 = (_temp2 = class BlogInput {
  constructor() {
    _defineProperty(this, "name", _initializerWarningHelper(_descriptor3, this));
  }

}, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "name", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
let CreateBlog = (_dec6 = (0, _grapheneJs.ObjectType)(), _dec7 = (0, _grapheneJs.InputField)((0, _grapheneJs.NonNull)(BlogInput)), _dec8 = (0, _grapheneJs.Field)(BlogType), _dec6(_class7 = (_class8 = (_temp3 = class CreateBlog {
  constructor() {
    _defineProperty(this, "input", _initializerWarningHelper(_descriptor4, this));

    _defineProperty(this, "blog", _initializerWarningHelper(_descriptor5, this));
  }

  mutate(root, info, {
    input
  }) {
    console.log('root', root);
    console.log('info', info);
    console.log('input', input);
  }

}, _temp3), (_descriptor4 = _applyDecoratedDescriptor(_class8.prototype, "input", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "blog", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8)) || _class7);
let PostType = (_dec9 = (0, _grapheneJs.ObjectType)(), _dec10 = (0, _grapheneJs.Field)(_grapheneJs.ID), _dec11 = (0, _grapheneJs.Field)(String), _dec12 = (0, _grapheneJs.Field)(BlogType), _dec9(_class10 = (_class11 = (_temp4 = class PostType {
  constructor() {
    _defineProperty(this, "id", _initializerWarningHelper(_descriptor6, this));

    _defineProperty(this, "name", _initializerWarningHelper(_descriptor7, this));
  }

  blog() {
    return _Blog.default.findOne({
      where: {
        id: this.blogId
      }
    });
  }

}, _temp4), (_descriptor6 = _applyDecoratedDescriptor(_class11.prototype, "id", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class11.prototype, "name", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class11.prototype, "blog", [_dec12], Object.getOwnPropertyDescriptor(_class11.prototype, "blog"), _class11.prototype)), _class11)) || _class10);
let PostInput = (_dec13 = (0, _grapheneJs.InputObjectType)(), _dec14 = (0, _grapheneJs.InputField)(String), _dec15 = (0, _grapheneJs.InputField)(_grapheneJs.ID), _dec13(_class13 = (_class14 = (_temp5 = class PostInput {
  constructor() {
    _defineProperty(this, "name", _initializerWarningHelper(_descriptor8, this));

    _defineProperty(this, "blogId", _initializerWarningHelper(_descriptor9, this));
  }

}, _temp5), (_descriptor8 = _applyDecoratedDescriptor(_class14.prototype, "name", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class14.prototype, "blogId", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class14)) || _class13);
let CommentType = (_dec16 = (0, _grapheneJs.ObjectType)(), _dec17 = (0, _grapheneJs.Field)(_grapheneJs.ID), _dec18 = (0, _grapheneJs.Field)(String), _dec19 = (0, _grapheneJs.Field)(String), _dec20 = (0, _grapheneJs.Field)(PostType), _dec21 = (0, _grapheneJs.Field)(_grapheneJs.Date), _dec16(_class16 = (_class17 = (_temp6 = class CommentType {
  constructor() {
    _defineProperty(this, "id", _initializerWarningHelper(_descriptor10, this));

    _defineProperty(this, "text", _initializerWarningHelper(_descriptor11, this));

    _defineProperty(this, "authorEmail", _initializerWarningHelper(_descriptor12, this));

    _defineProperty(this, "date", _initializerWarningHelper(_descriptor13, this));
  }

  post() {
    return _Post.default.findOne({
      where: {
        id: this.postId
      }
    });
  }

}, _temp6), (_descriptor10 = _applyDecoratedDescriptor(_class17.prototype, "id", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class17.prototype, "text", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class17.prototype, "authorEmail", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class17.prototype, "post", [_dec20], Object.getOwnPropertyDescriptor(_class17.prototype, "post"), _class17.prototype), _descriptor13 = _applyDecoratedDescriptor(_class17.prototype, "date", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class17)) || _class16);
let CommentInput = (_dec22 = (0, _grapheneJs.InputObjectType)(), _dec23 = (0, _grapheneJs.InputField)(String), _dec24 = (0, _grapheneJs.InputField)(String), _dec25 = (0, _grapheneJs.InputField)(_grapheneJs.ID), _dec22(_class19 = (_class20 = (_temp7 = class CommentInput {
  constructor() {
    _defineProperty(this, "text", _initializerWarningHelper(_descriptor14, this));

    _defineProperty(this, "authorEmail", _initializerWarningHelper(_descriptor15, this));

    _defineProperty(this, "postId", _initializerWarningHelper(_descriptor16, this));
  }

}, _temp7), (_descriptor14 = _applyDecoratedDescriptor(_class20.prototype, "text", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class20.prototype, "authorEmail", [_dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class20.prototype, "postId", [_dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class20)) || _class19);
let Query = (_dec26 = (0, _grapheneJs.ObjectType)(), _dec27 = (0, _grapheneJs.Field)(String), _dec28 = (0, _grapheneJs.Field)(CommentType, {
  args: {
    id: _grapheneJs.ID
  }
}), _dec29 = (0, _grapheneJs.Field)([CommentType], {
  args: {
    postId: _grapheneJs.ID,
    blogId: _grapheneJs.ID
  }
}), _dec26(_class22 = (_class23 = class Query {
  hello() {
    return "Jello";
  }

  getComment({
    id
  }) {
    return _Comment.default.findByPk(id);
  }

  getComments({
    postId,
    blogId
  }) {
    if (!!postId) {
      return _Post.default.findByPk(postId).then(post => _Comment.default.findAll({
        where: {
          postId: post.id
        }
      }));
    }

    if (!!blogId) {
      return _Blog.default.findByPk(blogId).then(blog => _Post.default.findAll({
        where: {
          blogId: blog.id
        }
      }).then(posts => posts.map(post => _Comment.default.findAll({
        where: {
          postId: post.id
        }
      }))));
    }

    return _Comment.default.findAll();
  }

}, (_applyDecoratedDescriptor(_class23.prototype, "hello", [_dec27], Object.getOwnPropertyDescriptor(_class23.prototype, "hello"), _class23.prototype), _applyDecoratedDescriptor(_class23.prototype, "getComment", [_dec28], Object.getOwnPropertyDescriptor(_class23.prototype, "getComment"), _class23.prototype), _applyDecoratedDescriptor(_class23.prototype, "getComments", [_dec29], Object.getOwnPropertyDescriptor(_class23.prototype, "getComments"), _class23.prototype)), _class23)) || _class22);
let Mutation = (_dec30 = (0, _grapheneJs.ObjectType)(), _dec31 = (0, _grapheneJs.Field)(BlogType, {
  args: {
    input: (0, _grapheneJs.NonNull)(BlogInput)
  }
}), _dec32 = (0, _grapheneJs.Field)(PostType, {
  args: {
    input: PostInput
  }
}), _dec33 = (0, _grapheneJs.Field)(CommentType, {
  args: {
    input: CommentInput
  }
}), _dec30(_class24 = (_class25 = class Mutation {
  createBlog({
    input
  }) {
    return _Blog.default.create(input);
  }

  createPost({
    input
  }) {
    return _Post.default.create(input);
  }

  createComment({
    input
  }) {
    return _Comment.default.create({ ...input,
      date: new Date()
    });
  }

}, (_applyDecoratedDescriptor(_class25.prototype, "createBlog", [_dec31], Object.getOwnPropertyDescriptor(_class25.prototype, "createBlog"), _class25.prototype), _applyDecoratedDescriptor(_class25.prototype, "createPost", [_dec32], Object.getOwnPropertyDescriptor(_class25.prototype, "createPost"), _class25.prototype), _applyDecoratedDescriptor(_class25.prototype, "createComment", [_dec33], Object.getOwnPropertyDescriptor(_class25.prototype, "createComment"), _class25.prototype)), _class25)) || _class24);
const schema = new _grapheneJs.Schema({
  query: Query,
  mutation: Mutation
});
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
`;
const createBlogQuery = `
    mutation addBlog($input: BlogInput!){
        createBlog(input: $input){
            id
        }
    }
`;
const createPostQuery = `
    mutation addPost($input: PostInput!){
        createPost(input: $input){
            id
        }
    }
`;
const createCommentQuery = `
    mutation addComment($input: CommentInput!){
        createComment(input: $input){
            id
            text
            authorEmail
            date
        }
    }
`;

const main = async () => {
  if (process.env.INITIAL_DATA) {
    await _dbInit.sequelize.sync();
    const blogVars = {
      input: {
        name: "my first blog"
      }
    };
    const result = await schema.execute(createBlogQuery, null, null, blogVars);

    if (result) {
      const {
        data: {
          createBlog: {
            id: blogId
          } = {}
        } = {}
      } = result || {};

      if (!!blogId) {
        const postVars = {
          input: {
            name: 'a new post',
            blogId
          }
        };
        const postResult = await schema.execute(createPostQuery, null, null, postVars);

        if (postResult) {
          const {
            data: {
              createPost: {
                id: postId
              } = {}
            }
          } = postResult || {};

          if (!!postId) {
            const commentVars = {
              input: {
                text: 'awesome post',
                authorEmail: 'x@y.com',
                postId
              }
            };
            const commentResult = await schema.execute(createCommentQuery, null, null, commentVars);
            console.log(JSON.stringify(commentResult, null, 2));
          }
        }
      }
    }
  } else {
    var result = await schema.execute(getQuery, null, null, {
      postId: 5
    });
    console.log(JSON.stringify(result, null, 4));
  }
};

main();

