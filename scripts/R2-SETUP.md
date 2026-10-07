# 📦 Guide d'Hébergement & Synchronisation Cloudflare R2 pour CQFDMaths

Ce guide détaille la mise en place de l'hébergement gratuit des documents PDF sur **Cloudflare R2** et l'utilisation du script de synchronisation automatisé [`scripts/sync-pdfs-to-r2.mjs`](file:///home/amsomr/Projects/CQFDMaths/scripts/sync-pdfs-to-r2.mjs).

---

## 🌟 Pourquoi Cloudflare R2 ?

- **10 Go de stockage gratuit** à vie.
- **Bande passante (Egress) 100% Gratuite** : aucun coût de transfert, même si des milliers d'élèves téléchargent des fichiers volumineux.
- **Cache CDN mondial haute performance** avec des nœuds de bordure au Maroc (Casablanca).
- **Compatibilité native S3**.

---

## 🛠️ 1. Création du Bucket & Clés API sur Cloudflare

1. Rendez-vous sur le tableau de bord [Cloudflare Dashboard](https://dash.cloudflare.com/) ➔ **R2 Object Storage**.
2. Cliquez sur **Create bucket** :
   - Nom du bucket : `cqfdmaths-pdfs`
   - Localisation : *Automatic* (ou *Western Europe* / *North America*)
3. Dans l'onglet **Settings** du bucket :
   - Sous **Public Access**, activez **Custom Domain** (ex: `cdn.cqfdmaths.ma`) ou **R2.dev subdomain**.
4. Dans le menu R2 principal, cliquez sur **Manage R2 API Tokens** ➔ **Create API Token** :
   - Permissions : **Object Read & Write**
   - Bucket cible : `cqfdmaths-pdfs`
   - Récupérez :
     - `Account ID`
     - `Access Key ID`
     - `Secret Access Key`

---

## ⚙️ 2. Configuration des Variables d'Environnement

Créez ou mettez à jour votre fichier `.env.local` :

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID="votre_account_id_cloudflare"
R2_ACCESS_KEY_ID="votre_access_key_id"
R2_SECRET_ACCESS_KEY="votre_secret_access_key"
R2_BUCKET_NAME="cqfdmaths-pdfs"
R2_PUBLIC_URL="https://cdn.cqfdmaths.ma"
```

---

## 🚀 3. Utilisation du Script de Synchronisation

Le script [`scripts/sync-pdfs-to-r2.mjs`](file:///home/amsomr/Projects/CQFDMaths/scripts/sync-pdfs-to-r2.mjs) prend en charge le téléchargement, le nettoyage avec la bannière CQFDMaths officielle, l'optimisation des métadonnées, et l'upload vers R2.

### Commandes disponibles :

#### Mode Test local (Dry Run) :
Télécharge et nettoie les fichiers localement dans `./data/clean-pdfs/` sans envoyer sur R2 :
```bash
node scripts/sync-pdfs-to-r2.mjs --dry-run --limit 5
```

#### Traiter un document spécifique par son identifiant :
```bash
node scripts/sync-pdfs-to-r2.mjs --id 58512
```

#### Synchroniser un premier lot de 50 documents avec R2 :
```bash
node scripts/sync-pdfs-to-r2.mjs --limit 50 --concurrency 3
```

#### Synchroniser l'ensemble du catalogue (~2 750 documents) :
```bash
node scripts/sync-pdfs-to-r2.mjs --concurrency 4
```

> **Note sur le cache :**  
> Le script enregistre son état dans `scripts/r2-sync-manifest.json` et effectue une vérification `HeadObject` sur R2. Si vous relancez le script, il ignore automatiquement les documents déjà traités et transférés.

---

## ⚡ 4. Intégration Automatique avec Next.js

Dès que la variable `R2_PUBLIC_URL` est définie dans l'environnement, la route API [`/api/pdf?id={elementId}`](file:///home/amsomr/Projects/CQFDMaths/src/app/api/pdf/route.ts) effectue automatiquement une redirection `HTTP 307` vers le CDN Cloudflare :

$$\text{Élève clique sur le PDF} \longrightarrow \text{Next.js} \xrightarrow{\text{307 Redirect}} \text{Cloudflare R2 (CDN)} \longrightarrow \text{Téléchargement instantané}$$

- **Charge serveur Next.js** : Réduite de 99% (aucun traitement PDF à chaud, aucune consommation mémoire).
- **Temps de chargement pour l'élève** : Immédiat via le cache Cloudflare le plus proche géographiquement.
- **Mode hors-ligne / Repli** : Si un document n'est pas encore sur R2 ou si la variable est omise, le serveur Next.js continue de générer le document à la volée de manière sécurisée.
