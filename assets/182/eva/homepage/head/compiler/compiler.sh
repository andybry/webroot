#!/bin/bash
OPFILE1=index
OPFILE2=index-logged-in

function generateIndexFile() {

  name=$1
  OPFILE=../$1.html

  #Clear the file
  >|$OPFILE

  echo "Generating ${name}.html..."

  # Add modules
  sed -n '/\<\!\-\-modstart\-\-\>/, /\<\!\-\-modend\-\-\>/p' ../modules/page-start/index.html >> $OPFILE
  echo 'Added page start'

  cat ../modules/old-new/oldnew.html >> $OPFILE
  echo 'Added old vs new'


  cat ../public/components/eva-global-navigation/global-navigation.html >> $OPFILE
  echo 'Added global-navigation'

  sed -n '/\<\!\-\-modstart\-\-\>/, /\<\!\-\-modend\-\-\>/p' ../modules/hero/index.html >> $OPFILE
  echo 'Added Hero'

  if [ $name == "index-logged-in" ]; then
    cat ../modules/page-body/index-logged-in.html >> $OPFILE
    echo 'Added logged-in top section'
  else
    cat ../modules/page-body/index-logged-out.html >> $OPFILE
    echo 'Added logged-out top section'
  fi

  sed -n '/\<\!\-\-modstart\-\-\>/, /\<\!\-\-modend\-\-\>/p' ../modules/page-body/index.html >> $OPFILE
  echo 'Added page body'

  cat ../public/components/eva-global-footer/global-footer.html >> $OPFILE
  echo 'Added global footer'

  sed -n '/\<\!\-\- SNIPPET STARTS HERE \-\-\>/, /\<\!\-\- SNIPPET ENDS HERE \-\-\>/p' ../public/components/eva-eprivacy/index.html >> $OPFILE
  echo 'Added ePrivacy'

  sed -n '/\<\!\-\-modstart\-\-\>/, /\<\!\-\-modend\-\-\>/p' ../modules/page-end/index.html >> $OPFILE
  echo 'Added page end'

  echo 'Modules added'

  #Delete temporary tags

  sed '/\<\!\-\-modstart\-\-\>/d' $OPFILE > tmp
  mv tmp $OPFILE
  sed '/\<\!\-\-modend\-\-\>/d' $OPFILE > tmp
  mv tmp $OPFILE

  echo 'Temporary tags deleted'

  if [ $name != 'index-logged-in' ]; then
    sed '/\<\!\-\-Signed in HTML start\-\-\>/, /\<\!\-\-Signed in HTML end\-\-\>/d' $OPFILE > tmp
    mv tmp $OPFILE
  else
    sed '/\<\!\-\-Not signed in HTML start\-\-\>/, /\<\!\-\-Not signed in HTML end\-\-\>/d' $OPFILE > tmp
    mv tmp $OPFILE
  fi

}

# build files
generateIndexFile $OPFILE1
generateIndexFile $OPFILE2

#Compile SASS
sass ../public/scss/homepage.scss > ../public/css/homepage.css
sass ../public/scss/homepage-ie.scss > ../public/css/homepage-ie.css

echo '\ncopying components, images, scripts...'

#Copy CSS files
cp ../public/components/eva-typography/icons-ie7.css ../public/css
cp ../public/components/eva-typography/icons.css ../public/css
cp ../public/components/eva-typography/typography.css ../public/css

#Fonts
cp -r ../public/components/eva-typography/fonts/ ../public/fonts/

#Images
cp -r ../modules/page-body/public/img/ ../public/img/
cp -r ../modules/page-body/public/content-img/ ../public/content-img/
cp -r ../modules/hero/public/img/ ../public/img/
cp -r ../public/components/eva-global-navigation/public/img/ ../public/img/

#Copy Scripts

#Hero
cp ../modules/hero/public/js/hero.js ../public/js/
#Old / New
cp ../modules/old-new/oldnew.js ../public/js/
#Nav
cp ../public/components/eva-global-navigation/public/js/nav.js ../public/js/
#Requirejs
cp ../public/components/requirejs/require.js ../public/js/
#html5shiv
cp ../public/components/html5shiv/src/html5shiv.js ../public/js/
#JQuery
cp ../public/components/jquery/jquery.js ../public/js/
