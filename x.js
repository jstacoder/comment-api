[15:09:04] Requiring external module @babel/register
[15:09:05] Using gulpfile ~/git/comment-api/gulpfile.babel.js
[15:09:05] Starting 'copy'...
ARGS:  [ <File "index.js" <Buffer 22 75 73 65 20 73 74 72 69 63 74 22 3b 0a 0a 76 61 72 20 5f 67 72 61 70 68 65 6e 65 4a 73 20 3d 20 72 65 71 75 69 72 65 28 22 67 72 61 70 68 65 6e 65 ... >> ]
/Users/kyle/git/comment-api/index.js
index.js
true
false
"use strict";

var _grapheneJs = require("graphene-js");

var _Comment = _interopRequireDefault(require("./models/Comment"));

var _Blog = _interopRequireDefault(require("./models/Blog"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _temp2, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class7, _class8, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp3, _dec14, _dec15, _dec16, _dec17, _class10, _class11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

const createInitialData = () => {
  _Blog.default.create({
    name: 'first blog'
  }).then(blog => {
    _Post.default.create({
      name: 'first post in first blog',
      blogId: blog.id
    }).then(post => {
      _Comment.default.create({
        text: 'this is an awesome post',
        postId: post.id,
        authorEmail: 'jstacoder@gmail.com',
        date: Date.now()
      });

      _Comment.default.create({
        text: 'this is another awesome post',
        postId: post.id,
        authorEmail: 'jstacoder@gmail.com',
        date: Date.now()
      });

      _Comment.default.create({
        text: 'this is even better',
        postId: post.id,
        authorEmail: 'jstacoder@gmail.com',
        date: Date.now()
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

    _defineProperty(this, "blog", _initializerWarningHelper(_descriptor5, this));
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
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "blog", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class5)) || _class4);
let CommentType = (_dec8 = (0, _grapheneJs.ObjectType)(), _dec9 = (0, _grapheneJs.Field)(_grapheneJs.ID), _dec10 = (0, _grapheneJs.Field)(String), _dec11 = (0, _grapheneJs.Field)(String), _dec12 = (0, _grapheneJs.Field)(PostType), _dec13 = (0, _grapheneJs.Field)(Date), _dec8(_class7 = (_class8 = (_temp3 = class CommentType {
  constructor() {
    _defineProperty(this, "id", _initializerWarningHelper(_descriptor6, this));

    _defineProperty(this, "text", _initializerWarningHelper(_descriptor7, this));

    _defineProperty(this, "authorEmail", _initializerWarningHelper(_descriptor8, this));

    _defineProperty(this, "post", _initializerWarningHelper(_descriptor9, this));

    _defineProperty(this, "date", _initializerWarningHelper(_descriptor10, this));
  }

}, _temp3), (_descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "id", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "text", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "authorEmail", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "post", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "date", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class8)) || _class7);
let Query = (_dec14 = (0, _grapheneJs.ObjectType)(), _dec15 = (0, _grapheneJs.Field)(String), _dec16 = (0, _grapheneJs.Field)(CommentType, {
  args: {
    id: _grapheneJs.ID
  }
}), _dec17 = (0, _grapheneJs.Field)([CommentType]), _dec14(_class10 = (_class11 = class Query {
  hello() {
    return "Jello";
  }

  getComment({
    id
  }) {
    return _Comment.default.findByPk(id);
  }

  getComments() {
    return _Comment.default.findAll();
  }

}, (_applyDecoratedDescriptor(_class11.prototype, "hello", [_dec15], Object.getOwnPropertyDescriptor(_class11.prototype, "hello"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "getComment", [_dec16], Object.getOwnPropertyDescriptor(_class11.prototype, "getComment"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "getComments", [_dec17], Object.getOwnPropertyDescriptor(_class11.prototype, "getComments"), _class11.prototype)), _class11)) || _class10);
const schema = new _grapheneJs.Schema({
  query: Query
});
const q = `
    {
       getComments{
        text
       }
    }
`;

if (process.env.INITIAL_DATA) {
  createInitialData();
}

var result = schema.execute(q);
result.then(res => console.log(JSON.stringify(res)));


[15:09:05] Finished 'copy' after 20 ms
