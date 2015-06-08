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
  render: function () {
    return (
      <div>
        <h2>{this.context.router.getCurrentParams().filename}</h2>
        <span dangerouslySetInnerHTML={{__html: this.state.data}} />
      </div>
    );
  },
  componentDidMount: function  () {
    this.loadArticleContent();
  }
});