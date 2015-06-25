var Pagination = React.createClass({
  render: function () {
    var pageNum = Math.ceil(this.props.data.length / 5);
    var pageBtns = [];
    for (var i = 0; i < pageNum; i++)
      pageBtns.push(<button onClick={this.changePage.bind(null, i)} key={i}>{i}</button>);
    return (
      <pagination>
        {pageBtns}
      </pagination>
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
      return (<span key={article.filename.split('*')[0]} dangerouslySetInnerHTML={{__html: article.content}}/>);
    });
    this.setState({snippets: snippetContents});
  },
  componentWillReceiveProps: function (nextProps) {
    this.loadSnippets(nextProps.page);
  },
  render: function () {
    return (
      <snippets>
        {this.state.snippets}
      </snippets>
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
        <h1>Index</h1>
        <Pagination data={this.state.articles} parent={this}/>
        <Snippets page={this.state.page}/>
      </div>
    );
  }
});