var Router = ReactRouter;

var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Blog = React.createClass({
  render: function () {
    return (
      <div>
        <div className='header'>
          <h1>Life of xhu</h1>
          <div className='links'>
            <div className='link1'><Link to="index">Home</Link></div>
            <div className='link2'><Link to="archives">Archives</Link></div>
            <div className='link3'><Link to="projects">Projects</Link></div>
            <div className='link4'><Link to="aboutme">Aboutme</Link></div>
          </div>
        </div>
        <div className='col-lg-6 col-lg-offset-2 content'>
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={Blog}>
    <Route name="index" handler={Index}/>
    <Route name="archives" handler={Archives}/>
    <Route name="projects" handler={Projects}/>
    <Route name="aboutme" handler={Aboutme}/>
    <Route name="article" path="article/:filename" handler={Article}/>
    <NotFoundRoute handler={Index}/>
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function (Handler) {
//Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('blog'));
});