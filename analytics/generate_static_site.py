#!/usr/bin/env python3
"""Generate static analytics site for HCA Data Portal."""

import os

import analytics.api as ga
from analytics.static_site import generate_site
from constants import (
    CURRENT_MONTH,
    GA4_START_SEPARATE,
    HCA_PORTAL_ID,
    HCA_PORTAL_ONLY_FILTER,
    HISTORIC_UA_DATA_PATH,
    OAUTH_PORT,
    SECRET_NAME,
)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_PATH = os.path.join(
    SCRIPT_DIR, "..", ".credentials", "hca_ga4_credentials.json"
)


def main():
    os.environ.setdefault(SECRET_NAME, CREDENTIALS_PATH)

    ga_authentication = ga.authenticate(
        SECRET_NAME,
        ga.ga4_service_params,
        port=OAUTH_PORT,
    )

    generate_site(
        ga_authentication=ga_authentication,
        config={
            "site_title": "HCA Data Portal",
            "logo_url": "https://data.humancellatlas.org/hca-bio-networks/logos/logoHca.png",
            "favicon_url": "https://data.humancellatlas.org/hca-bio-networks/favicons/favicon.ico",
            "logo_link": "https://data.humancellatlas.org",
            "primary_color": "#1C7CC7",
            "primary_color_dark": "#005EA9",
        },
        property_id=HCA_PORTAL_ID,
        current_month=CURRENT_MONTH,
        analytics_start=GA4_START_SEPARATE,
        output_dir=os.path.join(SCRIPT_DIR, "site"),
        historic_data_path=os.path.join(SCRIPT_DIR, HISTORIC_UA_DATA_PATH),
        base_dimension_filter=HCA_PORTAL_ONLY_FILTER,
        search_path="/search",
    )


if __name__ == "__main__":
    main()
