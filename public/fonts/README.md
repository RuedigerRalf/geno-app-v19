# Self-Hosted Fonts

## Benötigte Font-Dateien

Lege folgende `.woff2`-Dateien in diesem Ordner ab:

### Roboto (Google Fonts)
1. Öffne: https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap
2. Kopiere die CSS-Inhalte in einen Browser mit einem User-Agent, der moderne Fonts unterstützt
3. Lade die `.woff2`-Dateien für die Unicode-Ranges herunter, die du benötigst (mindestens latin)
4. Benenne sie konsistent, z.B.:
   - `roboto-300.woff2` (Light)
   - `roboto-400.woff2` (Regular)
   - `roboto-500.woff2` (Medium)

### Material Icons
1. Öffne: https://fonts.googleapis.com/icon?family=Material+Icons
2. Lade die `.woff2`-Datei herunter
3. Benenne sie: `material-icons.woff2`

## Schnelle Alternative: google-webfonts-helper

Nutze https://gwfh.mranftl.com/fonts für einfachen Download:
1. Suche "Roboto"
2. Wähle Charsets: latin
3. Wähle Styles: 300, regular (400), 500
4. Modern Browsers (woff2 only)
5. Download-Dateien nach `/public/fonts/` kopieren

Für Material Icons:
1. Suche "Material Icons" 
2. Charset: latin
3. Style: regular
4. Download und nach `/public/fonts/` kopieren
