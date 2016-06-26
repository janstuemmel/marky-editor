require('../../testHelper');

var katex = require('katex');

describe('renderer', function() {

  var markdownFileMath;

  beforeEach(bootstrapMarky());

  beforeEach(function() {
    markdownFileShort = require('../../fixtures/math.md');
  });


  it('should display block math', inject(function(editor, preview) {

    // given
    var math = 'f_x(a) = a^2',
        block = mathBlock(math);

    // then
    editor.setContents(block);

    // then
    var content = preview.el.getElementsByClassName('katex')[0].outerHTML;

    expectMath(math).to.eql(content);
  }));



  it.skip('should display inline math', inject(function(editor, preview) {

    // given
    var math = 'f_x(a) = a^2',
        block = mathInline(math);

    // then
    editor.setContents(block);

    // then
    var content = preview.el.getElementsByClassName('katex')[0].outerHTML;

    expectMath(math).to.eql(content);
  }));

});


function mathBlock(math) {
  return '```math\n' + math + '\n```';
}

function mathInline(math) {
  return '$$' + math + '$$';
}

function expectMath(math) {
  return expect(katex.renderToString(math));
}
