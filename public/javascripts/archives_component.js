var TagList = React.createClass({
  componentDidMount: function () {
    document.title = 'Life of xhu - Archives';
  },
  render: function () {
    var $this = this;
    var tagBtns = [];
    $this.tags = [];
    this.props.data.forEach(function (article) {
      article.split('*')[3].split('.')[0].split('-').forEach(function (tag) {
        if ($this.tags.indexOf(tag) === -1){
          $this.tags.push(tag);
          tagBtns.push(<div className='tag-btn' key={$this.tags.length - 1}><button className='btn btn-default btn-sm' onClick={$this.filterArticle.bind(null, tag)}>{tag}</button></div>);
        }
      });
    });
    return (
      <div className='col-md-3 col-lg-2'>
        <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title">Tags</h4>
        <div className="col-xs-12 col-sm-12 col-md-12 tag-block">
          <div className="tags">
            <div className="widget">
              {tagBtns}
            </div>
          </div>
        </div>
      </div>
    );
  },
  changeTagState: function (tag) {
    var tagElem = document.getElementsByClassName('tag-btn')[this.tags.indexOf(tag)].children[0];
    this.selectedTags = this.selectedTags || [];
    if (tagElem.className.indexOf('active') === -1) {
      tagElem.className = 'btn btn-default btn-sm active';
      this.selectedTags.push(tag);
    } else {
      tagElem.className = 'btn btn-default btn-sm';
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    }
  },
  filterArticle: function (tag) {
    this.changeTagState(tag);
    var parent = this.props.parent;
    var srcArr = parent.state.articles;
    var distArr = [], filtered;
    for (var i = 0; i < srcArr.length; i++) {
      filtered = true;
      for (var j = 0; j < this.selectedTags.length; j++) {
        if (srcArr[i].indexOf(this.selectedTags[j]) === -1) {
          filtered = false;
          break;
        }
      }
      filtered ? distArr.push(srcArr[i]) : null;
    }
    parent.setState({filteredArticles: distArr});
  },
  cancelFilter: function () {
    this.props.parent.setState({filteredArticles: this.props.data});
  }
});

var ArticleList = React.createClass({
  render: function () {
    var articles = this.props.data;
    var yearDividedArticles = {};
    for (var i = 0; i < articles.length; i++) {
      var year = articles[i].split('*')[2].slice(0, 4);
      if (yearDividedArticles[year] === undefined)
        yearDividedArticles[year] = [articles[i]];
      else
        yearDividedArticles[year].push(articles[i]);
    }
    var years = Object.keys(yearDividedArticles).reverse();
    var yearDividedEles = [];
    years.forEach(function (year) {
      yearDividedEles.push(<h4 className='col-xs-12 col-sm-12 col-md-12 col-lg-12 widget-title'>{year}</h4>);
      yearDividedArticles[year].forEach(function (article) {
        var time = parseInt(article.split('*')[2].slice(4, 6)) + '月' + parseInt(article.split('*')[2].slice(6, 8)) + '日';
        yearDividedEles.push(
          <div className='col-xs-12 col-sm-6 col-md-4 title-block'>
            <div className='widget title-panel' key={article.split('*')[0]}>
              <p>{time}</p>
              <Link to="article" params={{filename: article}}>{article.split('*')[1]}</Link><br />
            </div>
          </div>
        );
      });
    });
    return (
      <div className='col-md-9 col-lg-6'>
        {yearDividedEles}
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
        <TagList data={this.state.articles} parent={this}/>
        <ArticleList data={this.state.filteredArticles}/>
      </div>
    );
  }
});