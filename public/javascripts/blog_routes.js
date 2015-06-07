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
        <header>
          <ul>
            <li><Link to="index">Home</Link></li>
            <li><Link to="archives">Archives</Link></li>
            <li><Link to="projects">Projects</Link></li>
            <li><Link to="aboutme">Aboutme</Link></li>
          </ul>
        </header>
        <RouteHandler/>
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
    <NotFoundRoute handler={Index}/>
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function (Handler) {
//Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});