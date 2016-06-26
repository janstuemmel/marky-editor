require('../testHelper');

describe('basic tests', function() {

  var markdownFileShort, markdownFileLong;

  beforeEach(bootstrapMarky());

  beforeEach(function() {
    markdownFileShort = require('../fixtures/short.md');
    markdownFileLong = require('../fixtures/long.md');
  });


  it('should import empty ace editor', inject(function(editor) {

    // when
    var content = editor.getContents();

    // then
    expect(content).to.be.eql('');
  }));


  it('should import ace editor with short markdown file', inject(function(editor) {

    // given
    editor.setContents(markdownFileShort);

    // when
    var contentLength = editor.getContents().length;

    // then
    expect(contentLength).to.be.eql(466);
  }));


  it('should import ace editor with long markdown file', inject(function(editor) {

    // given
    editor.setContents(markdownFileLong);

    // when
    var contentLength = editor.getContents().length;

    // then
    expect(contentLength).to.be.eql(2776);
  }));

});
