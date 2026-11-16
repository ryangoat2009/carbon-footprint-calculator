# Carbon Footprint Calculator

A Grade 12 web development project built with HTML, CSS, Bootstrap 5.3.8, and a small amount of JavaScript for the interactive calculator.

## Open the website

Open `index.html` in a web browser. No installation or build command is needed. All styles and images are included locally, so the site also works offline.

## Files

- `index.html`: introductory page, environmental image, required headings, paragraphs, and blue Calculate link.
- `calculator.html`: General, Home, Travel, Food, Electronic usage, Shopping, and Result panels in a Bootstrap card.
- `styles.css`: custom layout, spacing, typography, and responsive rules.
- `calculator.js`: panel navigation, validation, calculations, results, and reset behavior.
- `assets/earth.svg`: original vector illustration used by the `<img>` element.
- `vendor/bootstrap.min.css`: the official Bootstrap stylesheet, included locally.
- `vendor/BOOTSTRAP-LICENSE.txt`: Bootstrap's MIT license.

## Understanding the code

HTML describes the content. The `h1`, `h2`, `h4`, `p`, `img`, and `a` elements on the home page correspond to the assignment's required elements. Each input has a label, and each tab is linked to its panel.

Bootstrap supplies `container-fluid`, the `row` and `col-md-6` grid, cards, buttons, and form styling. The home page uses two columns on larger screens and stacks them on small screens. `styles.css` adds the green theme and matches the supplied reference's central form layout.

JavaScript keeps track of the selected panel with `currentStep`. `showStep()` displays that panel and hides the others. `validateStep()` checks the browser's input constraints. `showResult()` validates all panels, reads the form, calls `calculateFootprint()`, and inserts a breakdown into the page.

The personal fields are optional. Answers are held only in the current page; there is no database, analytics, account, or storage.

## Calculation assumptions

This is an educational demonstration, not a verified carbon inventory. The assignment did not specify a formula. The following **illustrative classroom assumptions** are also disclosed beside the result. They are not official emissions factors. Country and age do not affect the result.

| Category | Formula for annual kg CO₂e |
| --- | --- |
| Home | Monthly electricity in kWh × 12 × 0.5 ÷ people in household |
| Travel | Weekly car km × 52 × 0.2 ÷ passengers + annual flight hours × 90 |
| Food | Daily assumption × 365: plant-based 2, vegetarian 3, mixed 5, meat-heavy 7 kg |
| Electronics | New personal devices per year × 70 |
| Shopping | New personal clothing items per year × 10 |

Add the categories and divide by 1,000 for tonnes. Electronics accounts only for an illustrative manufacturing impact; device electricity is already part of Home. Public transport, heating fuels, public services, and many other sources are excluded.

Example: 600 kWh/month shared by four people, 100 car km/week shared by two, four flight hours/year, vegetarian diet, one new device, and 12 clothing items gives 900 + 880 + 1,095 + 70 + 120 = **3,065 kg CO₂e/year**, displayed as **3.07 tonnes**.

## Publish with GitHub Pages

1. Create a public repository named `carbon-footprint-calculator`.
2. Upload the contents of this folder, preserving `assets/` and `vendor/`. Make sure `index.html` is at the repository's top level.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, then **main** and **/(root)**. Save.
5. Wait for the deployment, then open the website link displayed by GitHub.
6. Check the home page, Calculate link, all form steps, and result on the published site.
7. Submit both the repository URL and the live website URL to the teacher.

Official references: [Bootstrap documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/) and [GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Reference limitations

The supplied assignment screenshots show a tabbed calculator, while the written requirements also describe an introductory page. This project includes both. The exact reference introduction, supporting paragraph, and secondary heading were not visible, so original replacement wording is used. Compare these with the teacher's complete reference before submission. The annotation arrows and colored outlines in the reference explain its components and are not part of the website.
