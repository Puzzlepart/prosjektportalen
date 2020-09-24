# CHANGELOG

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.7 - TBA

### Added

- Ability to add and show subtext underneath each phase in the phase selector webpart for every project #764
  - This is configured in the Termstore, check the wikipage: [How to configure the phase term set](https://github.com/Puzzlepart/prosjektportalen/wiki/How-to-configure-the-phase-term-set) after 2.7 has released
- Possibility to show and add float and percentage formatted values in the dynamic portfolio view for crawled properties

### Fixed

- Portfolio Overview does not work with fullscreen view #762
- Formatting issues when printing the Portfolioview page #759

## 2.6.12 - 08.07.2020

### Added

- Support for adding "Everyone but external users" to visitor group of project webs

## 2.6.11 - 15.06.2020

### Fixed

- Forward slash in project name fix for snapshot saving #748
- Fix for export project snapshot as PDF #747

## 2.6.10 - 21.04.2020

### Added

- Added truncate length setting for notefields in DynamicPortfolio #737
- Added functionality to use specific property for sorting project cards on homepage #742

### Fixed

- Updated React, TypeScript and @pnp to latest versions
- Fixed syntax for calls to SearchService.search
- Removal of old benefits fields in case of upgrade

## 2.6.9 - 09.03.2020

### Fixed

- Fixed date fields have 1 day offset in the portfolio overview #732

## 2.6.8 - 28.02.2020

### Fixed

- Save snapshots looks quirky in Edge and Chrome #727

## 2.6.7 - 14.02.2020

### Fixed

- Fixed sort by date fields in PortfolioOverview #724

## 2.6.6 - 13.02.2020

### Added

- Added tooltip for status field comments in portfolio #722
- Set isShowingAll for IGroup to false #720

### Fixed

- Made search value persist on view change #721
- Removed invalid param that blocked new installs
- Attempt to handle dates better in portfolio overview

## 2.6.5 - 08.01.2020

### Added

- Improved support for project types - collections of default content #707
- When toggling before/after 'tiltak' in the risk matrix, only show the new value #708
- Improvements related to resource allocation and filtering
- Change to parameter: Changed SkipRootPackage to SkipFieldsContentTypesAndLists to allow more graceful updates

### Fixed

- Overwrite of portfolio page to fix scrolling issue

## 2.6.4 - 08.01.2020

### Added

- Support for more than 500 items in portfolio content via search #704 #696
- All lists have versioning enabled #702
- Project snapshot history now opens in a new tab
- Improvements to portfolio overview scrolling
