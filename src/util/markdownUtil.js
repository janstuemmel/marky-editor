var marked = require('marked'),
    katex = require('katex');

var assign = require('lodash/assign');

var DEFAULT_OPTIONS = {
  inlineMath: true,
  blockMath : true
};

// function markdownUtil(options) {
//
//   var options = assign({}, DEFAULT_OPTIONS, options);
//
// }
//
// module.exports = markdownUtil;


var _tok = marked.Parser.prototype.tok;

marked.Parser.prototype.tok = function() {

  var type = this.token.type;

  // render inline equation $$ * $$
  if (type === 'paragraph' ) {

    var text = this.token.text;

    text = text.replace(/\$\$(((?!\$\$).)*)\$\$/g, function(match, x) {

      try {
        return katex.renderToString(x);
      } catch(e) {}

      return x;
    });

    return text;
  }

  // render math in code block
  if (type === 'code' && this.token.lang === 'math') {

    var lines = this.token.text.match(/[^\r\n]+/g);

    var string = '';

    for (var i=0; i<lines.length; i++) {
      var s = '';
      try {
        s = katex.renderToString(lines[i])
      } catch(e) {
        s = lines[i];
      }
      string += '<p>' + s + '<p>';
    }

    return '<div style="text-align:center">' + string + '</div>';

  }

  return _tok.apply(this, arguments);
}

module.exports = marked;
