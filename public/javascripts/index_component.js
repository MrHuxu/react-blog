var Pagination = React.createClass({
  getInitialState: function () {
    return ({currentPage: 0});
  },
  render: function () {
    return (
      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 widget pagination'>
        {this.generateBtns()}
      </div>
    )
  },
  generateBtns: function () {
    var pageNum = Math.ceil(this.props.data.length / 5);
    var pageBtns = [];
    if (this.state.currentPage !== 0)
      pageBtns.push(<button className='btn btn-default prev-btn' onClick={this.prevPage}>{'<< Prev'}</button>);
    for (var i = 0; i < pageNum; i++) {
      if (i === this.state.currentPage) {
        pageBtns.push(<button className='btn btn-default page-btn active' onClick={this.changePage.bind(null, i)} key={i}>{i}</button>);
      } else if (i === 0 || i === pageNum - 1 || (i >= this.state.currentPage - 1 && i <= this.state.currentPage + 1)) {
        pageBtns.push(<button className='btn btn-default page-btn' onClick={this.changePage.bind(null, i)} key={i}>{i}</button>);
      } else if (i > 0 && i < (this.state.currentPage - 1)) {
        if (pageBtns[pageBtns.length - 1].props.disabled !== 'disabled')
          pageBtns.push(<button className='btn btn-default page-btn' disabled='disabled'>...</button>);
      } else if (i > (this.state.currentPage + 1) && i < pageNum - 1) {
        if (pageBtns[pageBtns.length - 1].props.disabled !== 'disabled')
          pageBtns.push(<button className='btn btn-default page-btn' disabled='disabled'>...</button>);
      }
    }
    if (this.state.currentPage !== pageNum - 1)
      pageBtns.push(<button className="btn btn-default next-btn" onClick={this.nextPage}>{'Next >>'}</button>);
    return pageBtns;
  },
  changePage: function (page) {
    this.props.parent.setState({page: page});
    this.setState({currentPage: page});
    var pageBtns = document.getElementsByClassName('btn btn-default page-btn');
    for (var i = 0; i < pageBtns.length; i++) {
      if (parseInt(pageBtns[i].innerText) === page)
        pageBtns[i].className = 'btn btn-default page-btn active';
      else
        pageBtns[i].className = 'btn btn-default page-btn';
    }
  },
  prevPage: function () {
    this.changePage(this.state.currentPage - 1);
  },
  nextPage: function () {
    this.changePage(this.state.currentPage + 1);
  }
});

var Snippets = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return ({snippets: []});
  },
  loadSnippets: function (page) {
    var $this = this;
    var responseContent = $.ajax({
      type: 'POST',
      url: '/all_articles/page_articles',
      data: {page: page},
      async: false
    }).responseText;
    var snippetContents = JSON.parse(responseContent).articles.map(function (article) {
      return $this.generateSnippetPanels(article);
    });
    this.setState({snippets: snippetContents});
  },
  generateSnippetPanels: function (article) {
    var dateTime = article.filename.split('*')[2],
        date     = parseInt(dateTime.slice(4, 6)) + '月' + parseInt(dateTime.slice(6, 8)) + '日',
        year     = dateTime.slice(0, 4),
        tags     = article.filename.split('*')[3].split('.')[0],
        tagArr   = tags.split('-');
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget index-content">
        <div className="index-header">
          <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title">{date + ' ' + [year].concat(tagArr).join(' · ')}</h4>
        </div>
        <span key={article.filename.split('*')[0]} dangerouslySetInnerHTML={{__html: article.content}}/>
        <div className='index-footer'>
          <a className="btn btn-default" href={this.context.router.makeHref('article', {filename: article.filename})}>Continue Reading</a>
        </div>
      </div>
    );
  },
  componentWillReceiveProps: function (nextProps) {
    this.loadSnippets(nextProps.page);
  },
  render: function () {
    return (
      <div>
        {this.state.snippets}
      </div>
    );
  }
})

var Index = React.createClass({
  getInitialState: function() {
    return {articles: [], page: 0};
  },
  loadArticles: function () {
    $.get('/all_articles', function (data) {
      this.setState({articles: data.articles});
    }.bind(this));
  },
  componentDidMount: function () {
    this.loadArticles();
    document.title = 'Life of xhu - Home';
  },
  componentDidUpdate: function () {
    highlightAndShowLineNum();
  },
  render: function () {
    return (
      <div>
        <div className="col-md-4 col-lg-3 sidebar">
          <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title">Me</h4>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget description">
            <p className="index-desc">xhu</p>
            <p className="index-desc">跳大飞机</p>
            <p className="index-desc">金牛座程序员</p>
            <p className="index-desc">唱歌，编程，看书</p>
            <p className="index-desc">瞪谁谁怀孕</p>
          </div>
          <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title">Motto</h4>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget motto">
            <p>thought & thinking & doing & done</p>
          </div>
          <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title">Latest</h4>
          <div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget latest">
          </div>
          </div>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-9 col-md-offset-3 col-lg-6 col-lg-offset-2 index-block'>
          <Pagination data={this.state.articles} parent={this}/>
          <Snippets page={this.state.page}/>
        </div>
      </div>
    );
  }
});