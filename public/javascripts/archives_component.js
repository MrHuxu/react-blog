var ArticleList = React.createClass({
  render: function () {
    var articleLinks = this.props.data.map(function (article) {
      return (
        <article>
          <a href='*'>{article}</a><br />
        </article>
      );
    });
    return (
      <div className="article-links">
        {articleLinks}
      </div>
    );
  }
});

var Archives = React.createClass({
  getInitialState: function() {
    return {articles: []};
  },
  loadArticles: function () {
    $.get('/all_articles', function (data) {
      this.setState({articles: data.articles});
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <h1>Archives</h1>
        <ArticleList data={this.state.articles}/>
      </div>
    );
  },
  componentDidMount: function () {
    this.loadArticles();
  }
});