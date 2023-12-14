# Changelog

## v2.3.1 (2023-12-08)

### Bugfix
* Fix: reset Snackbar after incompatible query message ([#151](https://github.com/medizininformatik-initiative/feasibility-gui/pull/151))


## v2.3.0 (2023-12-08)

### Bugfix
* Fix: set correct english display for Send Button ([#149](https://github.com/medizininformatik-initiative/feasibility-gui/pull/149))
* Fix: fix translation to Structured Query for quantity-range filter ([#148](https://github.com/medizininformatik-initiative/feasibility-gui/pull/148))
* Fix: fix location result display when result is 0 ([#146](https://github.com/medizininformatik-initiative/feasibility-gui/pull/146))

### Feature
* Support loading of non-compatible queries and templates; shows warning for every incorrect criterion ([#147](https://github.com/medizininformatik-initiative/feasibility-gui/pull/147))


## v2.2.0 (2023-11-17)

### Bugfix
* Fix: Update central consent to set conset criterion directly ([#139](https://github.com/medizininformatik-initiative/feasibility-gui/pull/138))
* fix: display unit when selecting value range ([#139](https://github.com/medizininformatik-initiative/feasibility-gui/pull/139))


## v2.1.0 (2023-11-09)

### Feature
* Link to proposal configurable([#126](https://github.com/medizininformatik-initiative/feasibility-gui/issues/126))
* Allow setting criterion as required for dataselection ([#125](https://github.com/medizininformatik-initiative/feasibility-gui/issues/125))
* Make all termtree nodes selectable for dataselection ([#124](https://github.com/medizininformatik-initiative/feasibility-gui/issues/124))
* Add info text to dataselection ([#123](https://github.com/medizininformatik-initiative/feasibility-gui/issues/123))
* Add info snakebar for Downtime ([#122](https://github.com/medizininformatik-initiative/feasibility-gui/issues/122))
* Update saving of queries and templates ([#116](https://github.com/medizininformatik-initiative/feasibility-gui/issues/116))
* Make value filter optional according to ui profile ([#112](https://github.com/medizininformatik-initiative/feasibility-gui/issues/112))
* Improve error handling ([#88](https://github.com/medizininformatik-initiative/feasibility-gui/issues/88))

### Bugfix
* Error loading linked criteria ([#131](https://github.com/medizininformatik-initiative/feasibility-gui/issues/131))
* Remove value filter if no concept selected ([#121](https://github.com/medizininformatik-initiative/feasibility-gui/issues/121))
* Quantity for Attributes does not work ([119](https://github.com/medizininformatik-initiative/feasibility-gui/issues/119))
* Loading of linking criterion does not work ([#115](https://github.com/medizininformatik-initiative/feasibility-gui/issues/115))

## v2.0.0 (2023-10-08)

### Feature
* Update to Ontology Version 2.0.0
* Add Context and dynamic ui profile loading
* Add Referenced Criteria
* Add reset filter option
* Make values optional according to ui_profile information
* Dataselection
* Upload Feasibility Query
* Make UI user configurable via config

## v1.0.0 (2023-03-29)

### Feature
* add import and download functionality for Structured Query files
* add consent chooser
* adding tooltips
* add getting rate limit result from backend
* make copyright year configurable

### Bugfix
* change baseurl path in configuration
* refactor docker setup and update to the newest nginx
* change user-role checking, switch from group to realm-access roles


## v0.4.0 (2023-03-17)

### Security
* update to Angular 15 & Angular Material 15
* update to Node.js v18.13.0
* update to new Backend obfuscation API

### Feature
* add error handling and messages for too many requests

### Bugfix
* fixing various style issues

The full changelog can be found [here](https://github.com/medizininformatik-initiative/feasibility-gui/milestone/1?closed=1).


## v0.3.0 (2022-11-19)
Initial Version
