App = Ember.Application.create();

Visitor = Ember.Object.extend({
  init: function() {
    date = new Date;
    this.set('todaysDate', moment(date));
  },
  
  calculateOldToday: function() {
    yearsDiff = this.todaysDate.diff(this.dateOfBirth, 'years');
    this.set('oldToday', yearsDiff);
    return yearsDiff;
  }.observes('dateOfBirth'),

  calculateReferenceAge: function() {
    yearsDiff = this.referenceDate.diff(this.dateOfBirth, 'years');
    this.set('referenceAge', yearsDiff);
  }.observes('referenceDate'),

  calculateReferenceDate: function() {
    birthDate = this.dateOfBirth.clone();
    birthDate.add('years', this.referenceAge)
    this.set('referenceDate', birthDate)
  }.observes('referenceAge')

});

visitor = Visitor.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({

});