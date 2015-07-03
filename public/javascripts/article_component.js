var Article = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  loadArticleContent: function () {
    $.post('/all_articles/single_article', {name: this.context.router.getCurrentParams().filename}, function (data) {
      this.setState({data: data});
    }.bind(this));
  },
  getInitialState: function () {
    return ({data: ''});
  },
  componentDidMount: function  () {
    this.loadArticleContent();
    var fileName = this.context.router.getCurrentParams().filename;
    document.title = 'Life of xhu - ' + fileName.split('*')[1];
  },
  render: function () {
    return (
      <div>
        <h2>{this.context.router.getCurrentParams().filename}</h2>
        <span dangerouslySetInnerHTML={{__html: this.state.data}} />
      </div>
    );
  }
});