# Changelog
## v6.0.6 (2025-02-18)

### Bug Fixes
* fixed error message for missing consent validation

### Changes
* Refactored CreateCriterionService ([#326](https://github.com/medizininformatik-initiative/feasibility-gui/issues/326))



## v6.0.5 (2025-02-17)

### Bug Fixes
* fixed wrong key for valueDefinition mapping



## v6.0.4 (2025-02-14)

### Bug Fixes
* fixed wrong key for attributeDefinition mapping

### Changes
* Refactored criterion hash service



## v6.0.4-alpha (2025-02-11)

### Bug Fixes
* Removed hashes in result details modal and replaced them with DIZ n-1 ([#313](https://github.com/medizininformatik-initiative/feasibility-gui/issues/313)).
* Fixed error message display and refactored snackbar service ([#310](https://github.com/medizininformatik-initiative/feasibility-gui/issues/310)).
* Resolved inconsistency between summary and detail results ([#303](https://github.com/medizininformatik-initiative/feasibility-gui/issues/303), [#304](https://github.com/medizininformatik-initiative/feasibility-gui/issues/304)).

### Changes
* Refactored feasibility query result service into smaller services ([#329](https://github.com/medizininformatik-initiative/feasibility-gui/issues/329)).
* Updated result details only once per feasibility query ([#317](https://github.com/medizininformatik-initiative/feasibility-gui/issues/317)).
* Refactored backend service ([#312](https://github.com/medizininformatik-initiative/feasibility-gui/issues/312)).

### Features
* Added UI support for attribute translations and main value display ([#314](https://github.com/medizininformatik-initiative/feasibility-gui/issues/314), [#311](https://github.com/medizininformatik-initiative/feasibility-gui/issues/311), [#315](https://github.com/medizininformatik-initiative/feasibility-gui/issues/315)).
* Displayed warning message when the start date is earlier than the end date ([#308](https://github.com/medizininformatik-initiative/feasibility-gui/issues/308)).




## v6.0.3 (2024-12-09)

### Bugfix

* Update query result after each polling intervall ([#303](https://github.com/medizininformatik-initiative/feasibility-gui/issues/304))


## v6.0.2 (2024-11-21)

### Bugfix

* Getting polling time from Feature-Provider-Service instead of Feature-Service
* Repeat polling until end of timer, regardless Null results in between



## v6.0.1 (2024-11-20)

### Bugfix

* Display data for all chip types correctly
* small language fixes

### Changed
* Increased pencil size icon in menu



## v6.0.0 (2024-11-20)

* New Design
  - Introduced a completely redesigned user interface for an improved user experience.
  - Updated visual elements, including color schemes, typography, and iconography, to create a modern and cohesive look.

* New Data Model
  - Implemented a new data model to enhance data handling and processing capabilities.

* New Component Structure
  - Reorganized the component structure for better modularity and maintainability.

* New Process Infrastructure
  - Developed a new process infrastructure to optimize system performance and scalability.
  - Redesigned the information architecture to make content more discoverable and ensure logical organization of information throughout the platform.

* New Backend Endpoints
  - Added new backend endpoints to support additional functionalities and improve API interactions.
  - Integrated Elastic Search feature that allows users to quickly find criteria and concepts within the application.

* New Module: Data Selection
  - Introduced a new data selection module to facilitate more efficient data management and retrieval.

* New translation services
  - Implemented new translation services for converting FeasibilityQueries and DataSelections to new CRDTL format.


### Feature

* Referenced Profiles in DSE Fields: ([#292](https://github.com/medizininformatik-initiative/feasibility-gui/issues/292)), ([#294](https://github.com/medizininformatik-initiative/feasibility-gui/issues/294))
  * Introduced referencedProfiles field for DSE to identify profiles referenced by a given field.
  * Added a checkbox in the UI to specify if a field is included as a profile reference or as a profile itself.
  * Automatic Addition of Referenced Profiles: When fetching the data selection profile, automatically include referenced profiles if the reference field is marked as required or recommended.
* Enable upload of data definition and cohort in data definition page
* Feature: reset time restriction, added new data class TimeRestrictionNotSet as default class
* added language switch
* implemented a new snackbar notification system to display error messages
* added animations for routing between pages
* introduced a stepper component for the data-query page
* removed the dashboard and set the Data Request page as the default start page ([#260](https://github.com/medizininformatik-initiative/feasibility-gui/issues/260))
* Switched from module to context in Search Result list ([#286](https://github.com/medizininformatik-initiative/feasibility-gui/issues/286))
* Added service to validate whether a criterion has all optional filters set and if inclusion criteria are set.
* Checked through service whether required attributes are set ([#277](https://github.com/medizininformatik-initiative/feasibility-gui/issues/277))
* Extended data model and added key to data object in adapter for profile tree; added info to view component to display field names comma-separated next to profile in DSE tree ([#275](https://github.com/medizininformatik-initiative/feasibility-gui/issues/275))
* Added required and recommended fields in data model and disabled delete for required fields([#273](https://github.com/medizininformatik-initiative/feasibility-gui/issues/273))
* Implemented dynamic tab title based on page and subpage ([#174](https://github.com/medizininformatik-initiative/feasibility-gui/issues/174))


### Changed
* update to new api endpoint version v4 ([#232](https://github.com/medizininformatik-initiative/feasibility-gui/issues/232))
* setting uniqueID for each DataSelection profile
* Changing icons, header and descriptions for better usability
* Update translations
* added new translators for FeasibilityQuery <> CCTDL and DataSelection <> CCTDL
* refactored Urls: querybuilder was renamed to feasibility-query
* split the feasibility-query page into three subpages: Search, Editor, and Result, each with representative URLs (feasibility-query/search, feasibility-query/editor, feasibility-query/result)
* split the data-selection page into three subpages: Search, Editor, and Result, with representative URLs (data-selection/search, data-selection/editor, data-selection/result)
* split the data-query page into two pages: Cohort Definition and Data Selection, with representative URLs (data-query/cohort-definition, data-query/data-selection).
* renamed file and folder names: querybuilder is now feasibility-query
* Added validation check before downloading and uploading a data request or cohort definition on the data request page
* Changed label in numerical input fields and swapped min and max input fields in RangeFilter


### Bugfix
* fixed display and css of the search filter ([#231](https://github.com/medizininformatik-initiative/feasibility-gui/issues/231))
* fixed spelling issue ([#230](https://github.com/medizininformatik-initiative/feasibility-gui/issues/230))
* fixed filter error in the linking criteria search ([#229](https://github.com/medizininformatik-initiative/feasibility-gui/issues/229))
* fixed search param error in the linking criteria search ([#228](https://github.com/medizininformatik-initiative/feasibility-gui/issues/228))
* show attribute display in the modal window ([#227](https://github.com/medizininformatik-initiative/feasibility-gui/issues/227))
* fixed viewport for Drag&Drop ([#226](https://github.com/medizininformatik-initiative/feasibility-gui/issues/226))
* exclude termcode version from hash ([#224](https://github.com/medizininformatik-initiative/feasibility-gui/issues/224))
* fixed various css problems
* Loading large queries - separate queries to chunks for getting profile data by ids ([#290](https://github.com/medizininformatik-initiative/feasibility-gui/issues/290))
* apply rerendering after setting filter ([#238](https://github.com/medizininformatik-initiative/feasibility-gui/issues/238))
* fix moving criteria within in- and exclusion ([#236](https://github.com/medizininformatik-initiative/feasibility-gui/issues/236))
* added missing translation keys
* fixed various css problems
* various bugfixing and code refactoring
* allowed empty search strings to be treated as valid search terms despite the minimum length requirement of 3 characters ([#254](https://github.com/medizininformatik-initiative/feasibility-gui/issues/254))
* added a ternary operator for the placeholder ([#255](https://github.com/medizininformatik-initiative/feasibility-gui/issues/255))
* fixed consent issue when loading from saved queries and starting a request.
* Fixed translation of Quantity in CCDL Translator ([#282](https://github.com/medizininformatik-initiative/feasibility-gui/issues/282))
* Fixed setting of comparator by creating a mapping function from UI intern to CCDL comparator ([#281](https://github.com/medizininformatik-initiative/feasibility-gui/issues/281))
* Set optional when creating a criterion based on the criteria profile data ([#280](https://github.com/medizininformatik-initiative/feasibility-gui/issues/280))
* Added missing function for translating valueFilter from CCDL to Ui intern data model ([#278](https://github.com/medizininformatik-initiative/feasibility-gui/issues/278))
* Added missing check for field children ([#274](https://github.com/medizininformatik-initiative/feasibility-gui/commit/3ff9d5a756025139497dc05654d8ac84f1941133))
* Display previously selected filter and search text when switching between search and editor page ([#262](https://github.com/medizininformatik-initiative/feasibility-gui/issues/262))
* Enabled multiple ValueSet URLs for CodeableConcept search, concatenated by commas ([#253](https://github.com/medizininformatik-initiative/feasibility-gui/issues/253))



## v6.0.0-alpha.6 (2024-11-15)

### Changed
* Added validation check before downloading and uploading a data request or cohort definition on the data request page
* Changed label in numerical input fields and swapped min and max input fields in RangeFilter

### Feature
* Switched from module to context in Search Result list ([#286](https://github.com/medizininformatik-initiative/feasibility-gui/issues/286))
* Added service to validate whether a criterion has all optional filters set and if inclusion criteria are set.
* Checked through service whether required attributes are set ([#277](https://github.com/medizininformatik-initiative/feasibility-gui/issues/277))
* Extended data model and added key to data object in adapter for profile tree; added info to view component to display field names comma-separated next to profile in DSE tree ([#275](https://github.com/medizininformatik-initiative/feasibility-gui/issues/275))
* Added required and recommended fields in data model and disabled delete for required fields([#273](https://github.com/medizininformatik-initiative/feasibility-gui/issues/273))
* Implemented dynamic tab title based on page and subpage ([#174](https://github.com/medizininformatik-initiative/feasibility-gui/issues/174))

### Bugfix
* Fixed translation of Quantity in CCDL Translator ([#282](https://github.com/medizininformatik-initiative/feasibility-gui/issues/282))
* Fixed setting of comparator by creating a mapping function from UI intern to CCDL comparator ([#281](https://github.com/medizininformatik-initiative/feasibility-gui/issues/281))
* Set optional when creating a criterion based on the criteria profile data ([#280](https://github.com/medizininformatik-initiative/feasibility-gui/issues/280))
* Added missing function for translating valueFilter from CCDL to Ui intern data model ([#278](https://github.com/medizininformatik-initiative/feasibility-gui/issues/278))
* Added missing check for field children ([#274](https://github.com/medizininformatik-initiative/feasibility-gui/commit/3ff9d5a756025139497dc05654d8ac84f1941133))
* Display previously selected filter and search text when switching between search and editor page ([#262](https://github.com/medizininformatik-initiative/feasibility-gui/issues/262))
* Enabled multiple ValueSet URLs for CodeableConcept search, concatenated by commas ([#253](https://github.com/medizininformatik-initiative/feasibility-gui/issues/253))



## v6.0.0-alpha.5 (2024-10-30)

### Changed
* refactored Urls: querybuilder was renamed to feasibility-query
* split the feasibility-query page into three subpages: Search, Editor, and Result, each with representative URLs (feasibility-query/search, feasibility-query/editor, feasibility-query/result)
* split the data-selection page into three subpages: Search, Editor, and Result, with representative URLs (data-selection/search, data-selection/editor, data-selection/result)
* split the data-query page into two pages: Cohort Definition and Data Selection, with representative URLs (data-query/cohort-definition, data-query/data-selection).
* renamed file and folder names: querybuilder is now feasibility-query

### Feature
* implemented a new snackbar notification system to display error messages
* added animations for routing between pages
* introduced a stepper component for the data-query page
* removed the dashboard and set the Data Request page as the default start page ([#260](https://github.com/medizininformatik-initiative/feasibility-gui/issues/260))


### Bugfix
* allowed empty search strings to be treated as valid search terms despite the minimum length requirement of 3 characters ([#254](https://github.com/medizininformatik-initiative/feasibility-gui/issues/254))
* added a ternary operator for the placeholder ([#255](https://github.com/medizininformatik-initiative/feasibility-gui/issues/255))
* fixed consent issue when loading from saved queries and starting a request.



## v6.0.0-alpha.4 (2024-10-20)

### Changed
* added new translators for FeasibilityQuery <> CCTDL and DataSelection <> CCTDL

### Bugfix
* various bugfixing and code refactoring



## v6.0.0-alpha.3 (2024-09-09)

### Feature
* added language switch

### Bugfix
* apply rerendering after setting filter ([#238](https://github.com/medizininformatik-initiative/feasibility-gui/issues/238))
* fix moving criteria within in- and exclusion ([#236](https://github.com/medizininformatik-initiative/feasibility-gui/issues/236))
* added missing translation keys
* fixed various css problems


## v6.0.0-alpha.2 (2024-09-05)

### Bugfix
* fixed display and css of the search filter ([#231](https://github.com/medizininformatik-initiative/feasibility-gui/issues/231))
* fixed spelling issue ([#230](https://github.com/medizininformatik-initiative/feasibility-gui/issues/230))
* fixed filter error in the linking criteria search ([#229](https://github.com/medizininformatik-initiative/feasibility-gui/issues/229))
* fixed search param error in the linking criteria search ([#228](https://github.com/medizininformatik-initiative/feasibility-gui/issues/228))
* show attribute display in the modal window ([#227](https://github.com/medizininformatik-initiative/feasibility-gui/issues/227))
* fixed viewport for Drag&Drop ([#226](https://github.com/medizininformatik-initiative/feasibility-gui/issues/226))
* exclude termcode version from hash ([#224](https://github.com/medizininformatik-initiative/feasibility-gui/issues/224))
* fixed various css problems

### Changed
* update to new api endpoint version v4 ([#232](https://github.com/medizininformatik-initiative/feasibility-gui/issues/232))
* setting uniqueID for each DataSelection profile



## v6.0.0-alpha.1 (2024-08-28)

### Changed
* New Design
  - Introduced a completely redesigned user interface for an improved user experience.
  - Updated visual elements, including color schemes, typography, and iconography, to create a modern and cohesive look.
  
* New Data Model
  - Implemented a new data model to enhance data handling and processing capabilities.
  
* New Component Structure
  - Reorganized the component structure for better modularity and maintainability.
  
* New Process Infrastructure
  - Developed a new process infrastructure to optimize system performance and scalability.
  - Redesigned the information architecture to make content more discoverable and ensure logical organization of information throughout the platform.
  
* New Backend Endpoints
  - Added new backend endpoints to support additional functionalities and improve API interactions.
  - Integrated Elastic Search feature that allows users to quickly find criteria and concepts within the application.

* New Module: Data Selection
  - Introduced a new data selection module to facilitate more efficient data management and retrieval.
  
* New translation services 
  - Implemented new translation services for converting FeasibilityQueries and DataSelections to new CRDTL format.



## v5.0.0-alpha.1 (2024-04-01)

### Changed
* Custom Internal Data Format for Structured Queries:
  -	Developed an internal data format specifically for Structured Queries, a data representation developed by our team.
* Improved Data Model Structure:
  -	Restructured the data model for better representation of Structured Queries through class and folder organization.
* Utilization of Abstract Classes and General Concepts:
  -	Incorporated abstract classes and general concepts into the data model for improved versatility.
* Simplified Attribute and Value Filter Types:
  -	Cleaned up attribute and value filter types for easier use.
* Type Checking Service Implementation:
  -	Added a service to perform type validation checks for attribute and value filter types.
* Structured Query Translation Service
  -	New translation services for translating UI query model to Structured Query and backwards for loading and import
* Structured Query validation:
  -	Uploaded Structured Queries gets validated
  -	Validation process changed for more precise information, which part of the structured query is corrupt


## v2.3.4 (2023-12-15)

### Bugfix
* Fix loading queries with empty or undefined results ([#161](https://github.com/medizininformatik-initiative/feasibility-gui/pull/161))


## v2.3.3 (2023-12-14)

### Bugfix
* Fix save-button on loading queries ([#159](https://github.com/medizininformatik-initiative/feasibility-gui/pull/159))
* Show patient results for saved queries 
* Fix height for search popup


## v2.3.2 (2023-12-14)

### Feature
* Improved design and handling of loading queries and templates ([#154](https://github.com/medizininformatik-initiative/feasibility-gui/pull/154))


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
