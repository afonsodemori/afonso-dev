#!/bin/bash

if ! command -v pandoc &> /dev/null; then
  echo "Error: pandoc is not installed. Please install it and try again."
  exit 1
fi

markdown_urls=(
  "https://static.afonso.dev/afonso-de-mori-cv-en.md"
  "https://static.afonso.dev/afonso-de-mori-cv-es.md"
  "https://static.afonso.dev/afonso-de-mori-cv-pt.md"
)

for markdown_url in "${markdown_urls[@]}"; do
  filename=$(basename $markdown_url)
  filepath=/tmp/$filename

  [[ $markdown_url =~ afonso-de-mori-cv-([a-z]{2})\.md ]] && lang="${BASH_REMATCH[1]}"
  output_yaml="./i18n/locales/generated/$lang-resume.yaml"
  output_html=$filepath.html

  curl $markdown_url -so $filepath
  pandoc $filepath -o $output_html
  echo "Converted $filename -> $output_html"

  echo "Generate $output_yaml"
  {
    echo "resume:"
    echo "  html: |"
    sed "s/@/{'@'}/g; s/|/{'|'}/g; s/^/    /" "$output_html" # Replace @, | and indent lines
  } > $output_yaml

  rm $filepath $output_html

  echo
done
