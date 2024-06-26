var scopackager = require('simple-scorm-packager');
var path = require('path');

const config = {
  version: '1.2',
  organization: 'QM',
  title: 'Bundesinstitut für Berufsbildung',
  language: 'de-DE',
  masteryScore: 80,
  startingPage: 'index.html',
  source: path.join(__dirname, 'content'),
  package: {
    version: process.env.npm_package_version,
    zip: true,
    author: 'Dominic FLorack / Jochen Kapalla',
    outputFolder: path.join(__dirname, 'scorm_packages'),
    description: 'A test of the course packaging module',
    keywords: ['scorm', 'test', 'course'],
    typicalDuration: 'PT0H5M0S',
    rights: `©${new Date().getFullYear()} QM. All right reserved.`,
  }
};

scopackager(config, function(msg){
  console.log(msg);
  process.exit(0);
});