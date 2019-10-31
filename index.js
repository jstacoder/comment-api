"use strict";

var _grapheneJs = require("graphene-js");

var _Comment = _interopRequireDefault(require("./models/Comment"));

var _Blog = _interopRequireDefault(require("./models/Blog"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _dbInit = require("./db-init");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor3, _descriptor4, _temp2, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class7, _class8, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp3, _dec14, _dec15, _dec16, _dec17, _class10, _class11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

const createInitialData = () => {
  return _dbInit.sequelize.sync().then(() => {
    _Blog.default.create({
      name: 'first blog'
    }).then(blog => {
      _Post.default.create({
        name: 'first post in first blog',
        blogId: blog.id
      }).then(post => {
        post.addComment({
          text: 'this is an awesome post',
          postId: post.id,
          authorEmail: 'jstacoder@gmail.com',
          date: Date.now()
        });
        post.addComment({
          text: 'this is another awesome post',
          postId: post.id,
          authorEmail: 'jstacoder@gmail.com',
          date: Date.now()
        });
        post.addComment({
          text: 'this is even better',
          postId: post.id,
          authorEmail: 'jstacoder@gmail.com',
          date: Date.now()
        });
      });
    });
  });
};

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
let PostType = (_dec4 = (0, _grapheneJs.ObjectType)(), _dec5 = (0, _grapheneJs.Field)(_grapheneJs.ID), _dec6 = (0, _grapheneJs.Field)(String), _dec7 = (0, _grapheneJs.Field)(BlogType), _dec4(_class4 = (_class5 = (_temp2 = class PostType {
  constructor() {
    _defineProperty(this, "id", _initializerWarningHelper(_descriptor3, this));

    _defineProperty(this, "name", _initializerWarningHelper(_descriptor4, this));
  }

  blog() {
    return _Blog.default.findOne({
      id: this.blogId
    });
  }

}, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "id", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "name", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class5.prototype, "blog", [_dec7], Object.getOwnPropertyDescriptor(_class5.prototype, "blog"), _class5.prototype)), _class5)) || _class4);
let CommentType = (_dec8 = (0, _grapheneJs.ObjectType)(), _dec9 = (0, _grapheneJs.Field)(_grapheneJs.ID), _dec10 = (0, _grapheneJs.Field)(String), _dec11 = (0, _grapheneJs.Field)(String), _dec12 = (0, _grapheneJs.Field)(PostType), _dec13 = (0, _grapheneJs.Field)(Date), _dec8(_class7 = (_class8 = (_temp3 = class CommentType {
  constructor() {
    _defineProperty(this, "id", _initializerWarningHelper(_descriptor5, this));

    _defineProperty(this, "text", _initializerWarningHelper(_descriptor6, this));

    _defineProperty(this, "authorEmail", _initializerWarningHelper(_descriptor7, this));

    _defineProperty(this, "date", _initializerWarningHelper(_descriptor8, this));
  }

  post() {
    return _Post.default.findOne({
      id: this.postId
    });
  }

}, _temp3), (_descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "id", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "text", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "authorEmail", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class8.prototype, "post", [_dec12], Object.getOwnPropertyDescriptor(_class8.prototype, "post"), _class8.prototype), _descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "date", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8)) || _class7);
let Query = (_dec14 = (0, _grapheneJs.ObjectType)(), _dec15 = (0, _grapheneJs.Field)(String), _dec16 = (0, _grapheneJs.Field)(CommentType, {
  args: {
    id: _grapheneJs.ID
  }
}), _dec17 = (0, _grapheneJs.Field)([CommentType], {
  args: {
    postId: _grapheneJs.ID,
    blogId: _grapheneJs.ID
  }
}), _dec14(_class10 = (_class11 = class Query {
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
        postId: post.id
      }));
    }

    if (!!blogId) {
      return _Blog.default.findByPk(blogId).then(blog => blog.getPosts().then(posts => posts.map(post => _Comment.default.findAll({
        postId: post.id
      }))));
    }

    return _Comment.default.findAll();
  }

}, (_applyDecoratedDescriptor(_class11.prototype, "hello", [_dec15], Object.getOwnPropertyDescriptor(_class11.prototype, "hello"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "getComment", [_dec16], Object.getOwnPropertyDescriptor(_class11.prototype, "getComment"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "getComments", [_dec17], Object.getOwnPropertyDescriptor(_class11.prototype, "getComments"), _class11.prototype)), _class11)) || _class10);
const schema = new _grapheneJs.Schema({
  query: Query
});
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
`;

if (process.env.INITIAL_DATA) {
  createInitialData();
} else {
  var result = schema.execute(q);
  result.then(res => console.log(JSON.stringify(res, null, 4)));
}

