define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var moreView = ComponentView.extend({

    events: {
      'click .js-more-click': 'onMore'
    },

    moreIndex: -1,
    
    preRender: function() {
      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      this.setReadyStatus();
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    onMore: function() {

      this.$('.more__item-bg-graphic').addClass('is-hidden');
      
      this.moreIndex++;
      this.model.get('_items').forEach((item, i) => {
        if(this.moreIndex === i) {
          this.$('.more__widget').eq(i).addClass('is-visible');
        } else {
          this.$('.more__widget').eq(i).removeClass('is-visible');
        }
        
      });

      if(this.moreIndex === this.model.get('_items').length-1) {
        this.setCompletionStatus();
        this.$('.more__btn').addClass('is-hidden');
        //this.$('.component__instruction').html(Adapt.course.get('_globals').scrollInstruction);
      }
    }

  },
  {
    template: 'more'
  });

  return Adapt.register('more', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: moreView
  });
});
