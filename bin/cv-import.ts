/* eslint-disable no-console */
import fs from 'fs';

class ImportResumes {
  private readonly baseUrl: string;
  private readonly sourceUrls: { lang: string; fileId: string }[];
  private readonly formats: string[];
  private readonly fileOutputPath: string;

  constructor() {
    // Source files from Google Drive
    this.baseUrl = 'https://docs.google.com/document/export?id={file_id}&format={format}';
    this.sourceUrls = [
      { lang: 'en', fileId: '1aYKfrRKX0YHVZukZvMGe3cXTOIY648ZXwF3iXTGQF34' },
      { lang: 'es', fileId: '1TT9BpFpy6QBs1sygecTuPAHD8iPMPII1y3Rw7rNuj74' },
      { lang: 'pt', fileId: '1hWho1MfmHPZIXEARbHaZJydXULzVoTqSnMi0Z64dOq8' },
    ];
    // Formats to download
    this.formats = ['pdf', 'docx', 'txt', 'odt', 'md'];
    // Public output path
    this.fileOutputPath = './public/docs/cv-{language}-afonso_de_mori.{format}';
  }

  async execute(): Promise<void> {
    for (const urlInfo of this.sourceUrls) {
      console.group(`Language: ${urlInfo.lang}`);

      for (const format of this.formats) {
        const endpoint = this.baseUrl
          .replace('{file_id}', urlInfo.fileId)
          .replace('{format}', format);
        console.log(`Getting ${endpoint}…`);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
        }
        const data = await response.arrayBuffer();

        const outputPath = this.fileOutputPath
          .replace('{language}', urlInfo.lang)
          .replace('{format}', format);
        console.info(`Generated: ${outputPath}`);
        fs.writeFileSync(outputPath, Buffer.from(data), 'binary');
        this.fix(format, urlInfo.lang, outputPath);
        console.log();
      }
      console.groupEnd();
      console.log();
    }
  }

  private fix(format: string, lang: string, path: string): void {
    if (!['txt', 'md'].includes(format)) return;

    console.info(`Fixing ${format}…`);

    if (format === 'txt') {
      const content = fs.readFileSync(path, 'utf-8');

      const output = content
        // Fix spaces
        .replace('\r\n Email:', '\r\nEmail:')
        .replace('\r\n Correo:', '\r\nCorreo:')
        .replace('\r\n E-mail:', '\r\nE-mail:')
        // Fix spaces and line breaks
        .replace(' \r\n me', ' me')
        .replace('Phone and WhatsApp:  ', '\r\nPhone and WhatsApp: ')
        .replace('Teléfono y WhatsApp:  ', '\r\nTeléfono y WhatsApp: ')
        .replace('Telefone e WhatsApp:  ', '\r\nTelefone e WhatsApp: ')
        // Improve links
        .replace('LinkedIn:  afonso.dev', '\r\nLinkedIn: https://afonso.dev')
        .replace('GitHub:  afonso.dev', '\r\nGitHub: https://afonso.dev')
        // Markdown has random spaces, fixing them in txt, just in case
        .split('\r\n')
        .map((line) => line.trim())
        .join('\r\n');

      fs.writeFileSync(path, output);
      return;
    }

    if (format === 'md') {
      // Markdown doesn't export footer, get the date from txt file then
      const date = fs
        .readFileSync(path.replace('.md', '.txt'), 'utf-8')
        .split('\n')
        .pop()
        ?.replace(/(https:\/\/.*)/, '[$1]($1)'); // Format link

      const content = fs
        .readFileSync(path, 'utf-8')
        .replace(/\\([+-])/g, '$1') // Remove unnecesary escape for - and +
        .replace('[image1]:', `_${date}_\n\n[image1]:`) // Add date
        .split('\n')
        .map((line) => line.trim()) // Remove random spaces
        .join('\n')
        .concat('\n'); // Add extra final line break

      // Original (yet improved) .md file will be used to generate HTML
      fs.writeFileSync(path.replace('.md', '.original.md'), content);

      // Format downloadable .md
      const output = content
        .replace(/!\[([^\]]+)]\[\w+]/g, '\n* $1') // Replace icons with text
        .split('\n')
        .map((line) => line.trim()) // Remove random spaces
        .filter((line) => !line.match(/^\[image\d+]: /)) // Remove image references at the end of the file
        .join('\n')
        .replace(/\n{2,}/g, '\n\n') // Remove extra line breaks
        .trim() // Remove extra line breaks
        .concat('\n'); // Add extra final line break

      fs.writeFileSync(path, output);
      return;
    }
  }
}

new ImportResumes()
  .execute()
  .then(() => {})
  .catch((error) => {
    console.error('Error executing ImportResumes:', error);
  });
