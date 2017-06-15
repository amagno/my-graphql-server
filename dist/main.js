'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

var typeDefs = ['\ntype Query {\n  hello: String\n}\n\nschema {\n  query: Query\n}'];

var resolvers = {
  Query: {
    hello: function hello(root) {
      return 'world';
    }
  }
};
var mySchema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });

app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: mySchema }));
app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

app.use('/', function (req, res) {
  res.send('Hello World!aaaassadasdasda');
});

app.listen(port, function () {
  console.log('Server is running on http://localhost:' + port + '/');
});
