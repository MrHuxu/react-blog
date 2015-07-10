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
