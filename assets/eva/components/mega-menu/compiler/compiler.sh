#!/bin/sh

GREEN='\033[32m'
D='\033[0m'

echo "${GREEN}Compiling mega-menu...${D}\n"

#Compile SASS
sass ../public/scss/mega-menu-comp.scss > ../public/css/mega-menu.css
sass ../public/scss/mega-menu-ie.scss > ../public/css/mega-menu-ie.css