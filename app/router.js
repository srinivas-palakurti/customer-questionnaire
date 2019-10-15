import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  // this.route('home', { path: '/index' });
  // this.route('/', { path: '/index' });

  this.route('question-content', {resetNamespace:true});

});

export default Router;
