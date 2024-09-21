## HCA Portal Analytics Config

The HCA Portal reports various events using Google Analytics 4 tags, which are documented here. All events, regardless of the GA version are called from functions in `dp-gtm.service.js` using `GTMService`.

### GA4 Event Inventory

| GTM Tag                            | Function                         | Event Action | Parameters                 | Description                                                      |
|------------------------------------|----------------------------------|--------------|----------------------------|------------------------------------------------------------------|
| `tag - search_metadata_click`      | `trackMetadataSearchResultClick` | `Click`      | `entityType`, `searchTerm` | Runs when the user selects a result from the metadata search bar |
| `tag - search_metadata_enter_text` | `trackMetadataSearchInput`       | `Enter Text` | `entityType`               | Runs whenever text is entered into the metadata search bar       |
| `tag - support_request_create`     | `trackSupportRequestCreated`     | `Create`     | `source`                   | Runs whenever a user creates a support request                   |

### Functions Without Corresponding GA4 Events

The following functions are defined in `dp-gtm.service.js`, but are currently unused and are not associated with GA4 tags:
| Function             | Event Action   | Parameters   | Description                                                                                                                                          |
|----------------------|----------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackCatalogViewed` | `View Catalog` | `entityType` | Intended to run whenever the user loads the Catalog from the home page, but currently is never called. The value of `entityType` is always `Catalog` |
| `trackSurveyLaunch`  | `Launch`       | (none)       | Intended to run whenever the user clicks the "Take the Survey" button for a survey from 2021                                                         |
