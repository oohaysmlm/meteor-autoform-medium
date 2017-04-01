Package.describe({
  name: 'gildaspk:autoform-medium',
  version: '0.0.7',
  summary: "Medium editor for AutoForm",
  description: "Medium editor for AutoForm",
  git: "http://github.com/djhi/meteor-autoform-medium.git"
});

Npm.depends(
  {
    "meteor-node-stubs": "0.2.3",
    'medium-editor-insert-plugin':'2.3.2',
    "sanitize-html":'1.14.1',
  }
);

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use([
    'templating',
    'ecmascript',
    'aldeed:autoform@5.3.0',
    'mediumeditor:mediumeditor@5.2.0',
    //'skehoe1989:medium-editor-insert-plugin'
  ], 'client');


  // TODO: restore when medium editor fixe deactivate
  //api.use('tap:18n', {weak: true});

  api.addFiles([
    'template.html',
    'template.js',
  ], 'client');
});
