# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The date of the current month to report on (yyyy-mm)
CURRENT_MONTH = "2025-02"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "February 2025"

# The name of the spreadsheet with the report
SHEET_NAME = "HCA Portal"

HCA_PORTAL_ID = "361323030"
# Filter to include only the HCA Portal
HCA_PORTAL_ONLY_FILTER = {"filter": {"fieldName": "hostName", "stringFilter": {"matchType": "EXACT", "value": "data.humancellatlas.org"}}}
# Filter to include only the HCA Explorer
HCA_EXPLORER_ONLY_FILTER = {"filter": {"fieldName": "hostName", "stringFilter": {"matchType": "EXACT", "value": "explore.data.humancellatlas.org"}}}
SECRET_NAME = "HCA_ANALYTICS_REPORTING_CLIENT_SECRET_PATH"
# The start date after which GA4 data is reliable for combined portal + explorer
GA4_START = "2023-07-01"
# The start date after which GA4 data is reliable for the portal and explorer separately
# This start date is shared by both portal and explorer because the report distinguishes them by hostname,
# which is not something that differed between the two prior to this date
GA4_START_SEPARATE = "2024-02-01"
HISTORIC_UA_DATA_PATH = "./users_over_time_history.json"

OAUTH_PORT = 8082
