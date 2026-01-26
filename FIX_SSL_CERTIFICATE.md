# SSL Certificate Fehler beheben

## Problem
```
Error: self-signed certificate
code: 'DEPTH_ZERO_SELF_SIGNED_CERT'
```

## Ursache
Die .NET API läuft mit einem selbst-signierten SSL-Zertifikat auf `https://localhost:7284`. Node.js lehnt dieses Zertifikat ab.

## Lösungen

### ✅ Lösung 1: TLS-Validierung für Entwicklung deaktivieren (BEREITS IMPLEMENTIERT)

In `src/server.ts` wurde hinzugefügt:
```typescript
if (process.env['NODE_ENV'] !== 'production') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}
```

**Starten Sie den Server neu:**
```powershell
# Terminal stoppen (Ctrl+C)
npm start
```

⚠️ **Wichtig**: Dies funktioniert nur in Entwicklung. In Produktion wird ein gültiges Zertifikat benötigt.

---

### Lösung 2: .NET Development Certificate exportieren und vertrauen

#### Schritt 1: Certificate exportieren
```powershell
# Im .NET API Projekt
dotnet dev-certs https --export-path localhost.pfx --password YourPassword
dotnet dev-certs https --trust
```

#### Schritt 2: Certificate in Node.js verwenden
```typescript
// In server.ts
import fs from 'fs';
import https from 'https';

process.env['NODE_EXTRA_CA_CERTS'] = './localhost.pfx';
```

---

### Lösung 3: HTTP für lokale Entwicklung verwenden

#### Backend (.NET):
In `appsettings.Development.json`:
```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      }
    }
  }
}
```

#### Frontend (Angular):
In `src/environments/environment.development.ts`:
```typescript
export const environment = {
    production: false,
    urlAddress: 'http://localhost:5000'
};
```

---

### Lösung 4: Proxy verwenden (verhindert CORS + SSL Probleme)

In `angular.json` → `architect` → `serve` → `options`:
```json
{
  "proxyConfig": "proxy.conf.json"
}
```

Erstellen Sie `proxy.conf.json`:
```json
{
  "/api": {
    "target": "https://localhost:7284",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Dann API-Calls ändern:
```typescript
// Statt: https://localhost:7284/api/Auth1/...
// Nur:   /api/Auth1/...
urlAddress: ''  // Leer lassen in environment
```

---

## Empfehlung

**Für schnelle Entwicklung**: ✅ **Lösung 1** (bereits implementiert)
- Einfach
- Keine Code-Änderungen nötig
- Nur Server-Neustart

**Für Team-Entwicklung**: **Lösung 4** (Proxy)
- Keine SSL-Probleme
- Keine CORS-Probleme
- Funktioniert für alle Entwickler

**Für Produktion**: 
- Gültiges SSL-Zertifikat (Let's Encrypt, etc.)
- `NODE_TLS_REJECT_UNAUTHORIZED` NIEMALS auf '0' setzen!

---

## Aktueller Status

✅ **Lösung 1 ist implementiert**

**Nächster Schritt:**
1. Terminal stoppen (Ctrl+C)
2. `npm start` erneut ausführen
3. API testen

Der Fehler sollte jetzt behoben sein! 🎉
