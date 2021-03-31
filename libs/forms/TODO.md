# TODO

## Form Controls

- Components provided via `forFeature` (via `DYN_CONTROLS_TOKEN`) ✓
- Provide config for appearance (theme, full-width, inline)
- Extensible handlers for context (panel, filter, table-cell, mobile?)
- How to add form options? (clear, label, defaultValue, fieldName, placeholder, tooltip, cssClass)
- How to add the filter options? (config, control, cleanseForUrl, apiFieldName)
- How to have reactive behavior? (readonly, immutable, visible, business-logic)
  - Custom behaviors for groups, like isVisible$
- Context Strategy to Display/Filter/Table
  - Support display mode (config displayHandler, displayParams)
- Customizable error handler
- How to style the controls consistently? (calling mod non-encapsulated styles?)
  - Layout config for dyn-factory? (maybe a default grid? colspan?)

## Filters

Special usage of Dynamic Forms.

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
Fill a DataSource with a Dynamically generated Form.

## Patterns

- Factory of controls for a given config
  - Flyweight enabling the creation of lazy-loaded components
- Strategy of common methods to be supported by the controls
  - (?) awareness of the available strategies
  - Essential methods only, with optional parameters

### OOP

- Inheritance of DynControls
- Composition of FormControls
