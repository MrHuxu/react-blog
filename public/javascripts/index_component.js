var Pagination = React.createClass({
  render: function () {
    var pageNum = Math.ceil(this.props.data.length / 5);
    var pageBtns = [];
    for (var i = 0; i < pageNum; i++)
      pageBtns.push(<button className='btn btn-default page-btn' onClick={this.changePage.bind(null, i)} key={i}>{i}</button>);
    return (
      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 widget pagination'>
        {pageBtns}
      </div>
    )
  },
  changePage: function (page) {
    this.props.parent.setState({page: page});
  }
});

var Snippets = React.createClass({
  getInitialState: function () {
    return ({snippets: []});
  },
  loadSnippets: function (page) {
    var responseContent = $.ajax({
      type: 'POST',
      url: '/all_articles/page_articles',
      data: {page: page},
      async: false
    }).responseText;
    var snippetContents = JSON.parse(responseContent).articles.map(function (article) {
      return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget index-content">
          <span key={article.filename.split('*')[0]} dangerouslySetInnerHTML={{__html: article.content}}/>
        </div>
        );
    });
    this.setState({snippets: snippetContents});
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
        <div className='col-xs-12 col-sm-12 col-md-9 col-md-offset-3 col-lg-6 col-lg-offset-4 index-block'>
          <Pagination data={this.state.articles} parent={this}/>
          <Snippets page={this.state.page}/>
        </div>
      </div>
    );
  }
});