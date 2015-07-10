var highlightAndShowLineNum = function () {
  var codeBlocks = document.getElementsByTagName('pre');
  for (var i = 0, len = codeBlocks.length; i < len; i++) {
    var block = codeBlocks[i].children[0];
    hljs.highlightBlock(block);
    var lineNum = block.innerHTML.split('\n').length - 1;
    var lineNumUl = document.createElement('ul');
    lineNumUl.className = 'numbering';
    for (var j = 1; j <= lineNum; j++) {
      var lineNumLi = document.createElement('li');
      lineNumLi.innerText = j;
      lineNumUl.appendChild(lineNumLi);
    }
    codeBlocks[i].appendChild(lineNumUl);
  }
};

/*(function menu () {
  document.getElementById("dropdown-btn").onclick = function() {
    if (this.className.indexOf('active') === -1) {
      this.className = 'btn btn-success active';
      document.getElementById('dropdown-list').style.display = '';
      document.getElementById('dropdown-list').className = 'dropin';
    } else {
      this.className = 'btn btn-success';
      document.getElementById('dropdown-list').className = 'dropout';
    }
  };
}());*/

(function detectScroll () {
  window.onscroll = function (ev) {
    if (document.getElementsByClassName('sidebar').length > 0) {
      if (window.scrollY >= 222)
        document.getElementsByClassName('sidebar')[0].style.top = '20px';
      else
        document.getElementsByClassName('sidebar')[0].style.top = 242 - window.scrollY + 'px';
    }
  }; 
}());
