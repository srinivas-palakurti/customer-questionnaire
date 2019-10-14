import Component from '@ember/component';

export default Component.extend({


  actions: {
    radioButtonSelected(identifier, value) {
      // console.log(identifier +" "+ value);
      this.optionSelected();
      // var action = this.get('radioButtonSelected');
      // console.log(action);

      // this.sendAction(action);
    }
  }

});
