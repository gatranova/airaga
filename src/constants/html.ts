/**
 * Generates a complete HTML document as a string.
 * 
 * @param page - A string representing the HTML content to be placed inside the body tag.
 * @returns {string} - A string containing a complete HTML document with the provided content.
 * 
 * @description
 * This function constructs a basic HTML template for the Airaga game engine, including essential meta tags 
 * and links for stylesheets and favicon. The provided `page` content is injected into the body of the template.
 */

export const html = (page: string): string => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Airaga is a game engine for interactive fiction." />
      <meta name="og:title" content="Airaga" />
      <meta name="og:description" content="Airaga is a game engine for interactive fiction." />
      <meta name="og:image" content="/favicon.ico" />
      <meta name="twitter:title" content="Airaga" />
      <meta name="twitter:description" content="Airaga is a game engine for interactive fiction." />
      <meta name="twitter:image" content="/favicon.ico" />
      <title>Airaga</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      ${page}
    </body>
  </html>
`;