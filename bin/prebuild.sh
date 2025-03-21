#!/bin/bash

output_dir="./i18n/locales/generated"
files=("en-curriculum.yaml" "es-curriculum.yaml" "pt-curriculum.yaml")

mkdir -p "$output_dir"

for file in "${files[@]}"; do
  filepath="$output_dir/$file"
  if [ ! -f "$filepath" ]; then
    echo -e "curriculum:\n  html: |\n    <h1>Missing translation</h1><p><code>npm run build:curriculum</code><p>\n" > "$filepath"
    echo "Created empty file: $filepath"
  fi
done
