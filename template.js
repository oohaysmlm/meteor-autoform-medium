import sanitize from "sanitize-html"
sanitizeHtml = sanitize;

AutoForm.addInputType('medium', {
    template: 'afMedium',
    valueOut: function() {
        var dirty = this[0].innerHTML;
        return sanitizeHtml(dirty, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
        });
    },
    contextAdjust: function(context) {
        return context;
    }
});

function initializeMediumEditor(options){
    var input = this.find('div');
    var opts = _.defaults((this.data.atts.mediumOptions || {}), options, {
        staticToolbar: true,
        stickyToolbar: true
    });

    var editor = new MediumEditor(input, opts);

    if(this.data.atts.minHeight){
        $(".medium-editor").height(this.data.atts.minHeight);
    }

    
    if(this.data.atts.insertPlugin){
        $('.editable').mediumInsert({
            editor: editor
        });
    }
    
    // TODO: restore when medium editor fixe deactivate
    /*
    Meteor.setTimeout((function(_this) {
      return function() {
        return Tracker.autorun(function() {
          var language, mediumOptions;
          editor.deactivate();
          if (Package['tap:i18n']) {
            language = TAPi18n.getLanguage();
          }
          mediumOptions = _this.data.atts.mediumOptions;
          opts = _.defaults(mediumOptions, {
            staticToolbar: true,
            stickyToolbar: true
          });
          _.extend(editor.options, mediumOptions);
          return editor.activate();
        }, 1000);
      };
    })(this));
    */
}

var helpers = {
    atts: function() {
        var atts = _.clone(this.atts) ||  {};
        delete atts.mediumOptions;

        return _.defaults(atts, {
            class: 'medium-editor'
        });
    }
};

Template.afMedium.rendered = function() {
    initializeMediumEditor.call(this);
};

Template.afMedium_materialize.rendered = function() {
    if(!this.data.atts.mediumOptions || (this.data.atts.mediumOptions && !this.data.atts.mediumOptions.keepLabel)){
        $('label[for=' + this.data.atts.id + ']:not([data-medium-label])').remove();

        return initializeMediumEditor.call(this, {
            placeholder: {
                text: 'Type your text for: ' + AutoForm.getLabelForField(this.data.atts.name)
            }
        });
    }

    initializeMediumEditor.call(this);
};

Template.afMedium.helpers(helpers);
Template.afMedium_materialize.helpers(helpers);
