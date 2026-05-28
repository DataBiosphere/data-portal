#!/usr/bin/env python3
"""Generate static analytics site for HCA Data Portal."""

import os
import re

import requests

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

ATLAS_PAGE_PATH_REGEX = r"^/hca-bio-networks/[^/]+/atlases/[^/]+$"
ATLAS_SLUG_PATTERN = re.compile(r"/hca-bio-networks/[^/]+/atlases/([^/]+)")
H5AD_URL_REGEX = r"\.h5ad$"

EVENT_KEY_PAGE_VIEWS = "atlas_page_views"
EVENT_KEY_DOWNLOADS = "atlas_downloads"
EVENT_PAGE_VIEW = "page_view"
EVENT_OUTBOUND_CLICK = "outbound_link_clicked"

# Synced from constants/networks.ts — update when atlases change
ATLASES = {
    "retina-v1-0": {
        "name": "Single-cell atlas of the human retina v1.0",
        "cxg_id": "4c6eaf5c-6d57-4c76-b1e9-60df8c655f1e",
    },
    "lung-v1-0": {
        "name": "The integrated Human Lung Cell Atlas (HLCA) v1.0",
        "cxg_id": "6f6d381a-7701-4781-935c-db10d30de293",
    },
    "brain-v1-0": {
        "name": "Human Brain Cell Atlas v1.0",
        "cxg_id": "283d65eb-dd53-496d-adb7-7570c7caa443",
    },
    "cortex-v1-0": {
        "name": "Human Cortical Cell Atlas v1.0",
        "cxg_id": "d17249d2-0e6e-4500-abb8-e6c93fa1ac6f",
    },
    "organoid-neural-v1-0": {
        "name": "An integrated transcriptomic cell atlas of human neural organoids v1.0",
        "cxg_id": "de379e5f-52d0-498c-9801-0f850823c847",
    },
    "organoid-endoderm-v1-0": {
        "name": "Integrated human endoderm-derived organoids cell atlas (HEOCA) v1.0",
        "cxg_id": "6282a908-f162-44a2-99a3-8a942e4271b2",
    },
}

CXG_API_BASE = "https://api.cellxgene.cziscience.com/curation/v1/collections"


def fetch_h5ad_title_map():
    """Fetch CELLxGENE collections and build a mapping from .h5ad URL to dataset title."""
    url_to_title = {}
    for slug, atlas in ATLASES.items():
        try:
            resp = requests.get(f"{CXG_API_BASE}/{atlas['cxg_id']}", timeout=30)
            resp.raise_for_status()
            collection = resp.json()
            for dataset in collection.get("datasets", []):
                title = dataset.get("title", "")
                for asset in dataset.get("assets", []):
                    if asset.get("filetype") == "H5AD":
                        url_to_title[asset["url"]] = title
        except Exception as e:
            print(f"  Warning: could not fetch CXG collection for {slug}: {e}")
    print(f"  Fetched {len(url_to_title)} .h5ad title mappings from CELLxGENE")
    return url_to_title


def resolve_atlas_titles(data):
    """Enrich detail records with atlas display names and dataset titles."""
    h5ad_titles = fetch_h5ad_title_map()

    count = 0
    for key, value in data.items():
        if key.endswith("_detail") and isinstance(value, list):
            for record in value:
                match = ATLAS_SLUG_PATTERN.search(record.get("page_path", ""))
                if match:
                    slug = match.group(1).replace(".", "-")
                    atlas = ATLASES.get(slug)
                    record["dataset_title"] = atlas["name"] if atlas else slug
                    count += 1
                click_url = record.get("click_url", "")
                if click_url and click_url in h5ad_titles:
                    record["file_label"] = h5ad_titles[click_url]
    print(f"  Enriched {count} records with atlas titles")


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
            "event_counts": [
                {"label": "Atlas Page Views", "event_key": EVENT_KEY_PAGE_VIEWS},
                {"label": "Atlas Downloads", "event_key": EVENT_KEY_DOWNLOADS},
            ],
        },
        property_id=HCA_PORTAL_ID,
        current_month=CURRENT_MONTH,
        analytics_start=GA4_START_SEPARATE,
        output_dir=os.path.join(SCRIPT_DIR, "site"),
        historic_data_path=os.path.join(SCRIPT_DIR, HISTORIC_UA_DATA_PATH),
        base_dimension_filter=HCA_PORTAL_ONLY_FILTER,
        search_path="/search",
        custom_events=[
            {
                "event_name": EVENT_PAGE_VIEW,
                "key": EVENT_KEY_PAGE_VIEWS,
                "label": "Atlas Page Views",
                "page_path_regex": ATLAS_PAGE_PATH_REGEX,
                "detail_table": True,
            },
            {
                "event_name": EVENT_OUTBOUND_CLICK,
                "key": EVENT_KEY_DOWNLOADS,
                "label": "Atlas Downloads",
                "page_path_regex": ATLAS_PAGE_PATH_REGEX,
                "click_url_regex": H5AD_URL_REGEX,
                "detail_table": True,
            },
        ],
        event_charts={
            "chart_start": GA4_START_SEPARATE,
            "charts": [
                {
                    "title": "Atlas Page Views Over Time",
                    "series": [{
                        "label": "Page Views",
                        "event_key": EVENT_KEY_PAGE_VIEWS,
                        "event_name": EVENT_PAGE_VIEW,
                        "page_path_regex": ATLAS_PAGE_PATH_REGEX,
                    }],
                },
                {
                    "title": "Atlas Downloads Over Time",
                    "series": [{
                        "label": "Downloads",
                        "event_key": EVENT_KEY_DOWNLOADS,
                        "event_name": EVENT_OUTBOUND_CLICK,
                        "page_path_regex": ATLAS_PAGE_PATH_REGEX,
                        "click_url_regex": H5AD_URL_REGEX,
                    }],
                },
            ],
        },
        title_resolver=resolve_atlas_titles,
    )


if __name__ == "__main__":
    main()
