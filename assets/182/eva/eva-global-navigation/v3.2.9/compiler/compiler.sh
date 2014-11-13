sass ../public/scss/global-navigation.scss > ../public/css/global-navigation.css
sass ../public/scss/global-navigation-comp.scss > ../public/css/global-navigation-comp.css
sass ../public/scss/global-navigation-ie.scss > ../public/css/global-navigation-ie.css
sass ../public/scss/masthead.scss > ../public/css/masthead.css

# Get cms content
curl http://www.which.co.uk/components/global/navigation.html > ../cms-content.html
# Build global nav
cat src/nav-start.html ../cms-content.html src/nav-end.html > ../global-navigation.html
# Build demo
cat src/header.html ../global-navigation.html src/footer.html  > ../demo-navigation.html
