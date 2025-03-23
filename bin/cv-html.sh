#!/bin/bash

if ! command -v pandoc &> /dev/null; then
  echo "Error: pandoc is not installed. Please install it and try again."
  exit 1
fi

input=(
  "public/docs/cv-en-afonso_de_mori.original.md"
  "public/docs/cv-es-afonso_de_mori.original.md"
  "public/docs/cv-pt-afonso_de_mori.original.md"
)

for file in "${input[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Error: File $file does not exist. Run 'npm run build:cv-import' to generate it."
    exit 1
  fi
done

for input_md in "${input[@]}"; do
  lang=$(echo "$input_md" | cut -d'-' -f2) # Extracts "en", "es", "pt"

  output_html=$(echo "$input_md" | sed 's/\.original.md/.html/')
  output_yaml="./i18n/locales/generated/$lang-curriculum.yaml"

  pandoc "$input_md" -o "$output_html"
  echo "Converted $input_md -> $output_html"

  echo "Make it pretty..."
  npx prettier \
    --log-level=error \
    --no-config \
    --parser=html \
    --ignore-path \
    --print-width=2000 \
    --html-whitespace-sensitivity=css \
    --write "$output_html"

  # Generate YAML
  echo "Generate $output_yaml"
  {
    echo "curriculum:"
    echo "  html: |"
    sed "s/@/{'@'}/g; s/|/{'|'}/g; s/^/    /" "$output_html" | # Replace @, | and indent lines
    sed 's/<img /<span class="contact-separator"><\/span><img /ig'
  } > "$output_yaml"

  rm "$input_md"

  echo
done
