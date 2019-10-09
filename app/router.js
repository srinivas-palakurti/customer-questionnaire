import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  // redirct: function () {
  //   this.transitionTo('home');
  // }
});

Router.map(function() {
  // this.route('home', { path: '/index' });
  // this.route('/', { path: '/index' });


  this.route('question-content');

});

export default Router;
