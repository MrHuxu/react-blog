var TagList = React.createClass({
  render: function () {
    var tags = [], tagBtns = [];
    var $this = this;
    this.props.data.forEach(function (article) {
      article.split('*')[3].split('.')[0].split('-').forEach(function (tag) {
        if (tags.indexOf(tag) === -1){
          tags.push(tag);
          tagBtns.push(<button key={tags.length - 1} className='btn btn-default btn-sm' onClick={$this.filterArticle.bind(null, tag)}>{tag}</button>);
        }
      });
    });
    return (
      <div className="widget">
        <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title">Tags</h4>
        {tagBtns}<br />
        <button className='btn btn-default btn-sm' onClick={this.cancelFilter}>Cancel</button>
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
        <div className='widget title-panel' key={article.split('*')[0]}>
          <Link to="article" params={{filename: article}}>{article}</Link><br />
        </div>
      );
    });
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 title-block">
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
        <div className='col-md-3'>
          <TagList data={this.state.articles} parent={this}/>
        </div>
        <div className='col-md-9'>
          <ArticleList data={this.state.filteredArticles}/>
        </div>
      </div>
    );
  }
});