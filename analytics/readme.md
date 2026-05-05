## Installing the environment
- Use Python 3.12.4
- Run `python -m venv ./venv` to create a new environment under `./venv`
- Run `source ./venv/bin/activate` to activate the environment
- Run `pip install -r ./requirements.txt` to install requirements

## Deactivating/reactivating
- To deactivate the environment, run `deactivate`
- To activate the environment again, run `source ./venv/bin/activate`

## Generating Google Sheets Reports
- Update `constants.py` to reflect the date ranges and file name you would like for the report
- Open `./generate_sheets_report.ipynb` using your favorite IDE or by running `jupyter notebook` and selecting it from the browser window that appears
- Run all cells in the Jupyter notebook by pressing the button with two arrows at the top. You will be prompted to log in to your Google Account, which must have access to the relevant analytics property
- Check your Google Drive to ensure that the desired spreadsheet is present

## Generating the Static Analytics Site
- Ensure GA4 credentials are at `../.credentials/hca_ga4_credentials.json`
- Update `CURRENT_MONTH` in `constants.py` to the desired report month
- Run `python generate_static_site.py` — you will be prompted to authenticate via Google OAuth
- The site is generated in `./site/` — preview locally with `cd site && python -m http.server 8080`
- Commit the generated `site/` directory; the GitHub Actions workflow deploys it to GitHub Pages on push to main
