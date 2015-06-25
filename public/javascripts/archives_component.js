var TagList = React.createClass({
  render: function () {
    var tags = [], tagBtns = [];
    var $this = this;
    this.props.data.forEach(function (article) {
      article.split('*')[3].split('.')[0].split('-').forEach(function (tag) {
        if (tags.indexOf(tag) === -1){
          tags.push(tag);
          tagBtns.push(<button key={tags.length - 1} onClick={$this.filterArticle.bind(null, tag)}>{tag}</button>);
        }
      });
    });
    return (
      <div className="widget tag-widget">
        {tagBtns}<br />
        <button onClick={this.cancelFilter}>Cancel</button>
      </div>
    );
  },
  filterArticle: function (tag) {
    var parent = this.props.parent;
    var srcArr = parent.state.filteredArticles;
    var distArr = [];
    srcArr.forEach(function (article) {
      if (article.indexOf(tag) !== -1)
        distArr.push(article);
    });
    parent.setState({filteredArticles: distArr});
  },
  cancelFilter: function () {
    this.props.parent.setState({filteredArticles: this.props.data});
  }
});

var ArticleList = React.createClass({
  render: function () {
    var articleLinks = this.props.data.map(function (article) {
      return (
        <article-title key={article.split('*')[0]}>
          <Link to="article" params={{filename: article}}>{article}</Link><br />
        </article-title>
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
    return {articles: [], filteredArticles: []};
  },
  loadArticles: function () {
    $.get('/all_articles', function (data) {
      this.setState({articles: data.articles, filteredArticles: data.articles});
    }.bind(this));
  },
  componentDidMount: function () {
    this.loadArticles();
  },
  render: function () {
    return (
      <div>
        <h1>Archives</h1>
        <TagList data={this.state.articles} parent={this}/>
        <ArticleList data={this.state.filteredArticles}/>
      </div>
    );
  }
});