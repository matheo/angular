# @myndpm/dyn-forms

Library to build dynamic forms via a config object.

## Form Controls

Components provided via `forFeature` (via `DYN_CONTROLS_TOKEN`).

- Provide config for appearance (theme, full-width, inline)
- Extensible handlers for context (panel, filter, table-cell, mobile?)
- How to add form options? (clear, label, defaultValue, fieldName, placeholder, tooltip, cssClass)
- How to add the filter options? (config, control, cleanseForUrl, apiFieldName)
- How to have reactive behavior? (readonly, immutable, visible, business-logic)
  - Custom behaviors for groups, like isVisible$
- Support display mode (config displayHandler, displayParams - strategy class)
- Default and customized validators per groups and components
- How to them consistently? (calling mod non-encapsulated styles?)

### Patterns

- Factory of controls for a given config
  - Flyweight enabling the creation of lazy-loaded components
- Strategy of common methods to be supported by the controls
  - (?) awareness of the available strategies
  - Essential methods only, with optional parameters

#### OOP

- Inheritance of DynControls
- Composition of FormControls

## Forms Config

An object defining the Component and Inputs to use.

- Typed config generators (static methods?)

## Filters

Special usage of Forms.

- Contracted components provided via `DYN_FILTERS_TOKEN` instead overload a unique token?
- Receives and updates URL queryParams
- Can have primary/additional filters
- Have some special handling like query/value/display/request handlers

## Table

Tabulated data fetched with the filters output.

- Dynamically rendered columns (customizable styles, value handler, order field)
- Extensibility with Pagination and Sorting

## DataSource

Data/logic layer separated of the UI.
