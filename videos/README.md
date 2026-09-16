# Teaser vidéo — mode d'emploi

Ce dossier accueille le teaser d'Aventicum Quest, référencé par les balises
`og:video` de la page d'accueil (`index.html`), aujourd'hui **en commentaire**
(inactives tant que la vidéo n'est pas en ligne).

## Activer le teaser (quand le montage est prêt)

1. **Exporter** le teaser en **MP4** (codec vidéo **H.264**, audio **AAC**).
   Viser **< 15 Mo** (c'est du static GitHub Pages, pas un CDN vidéo).
2. **Déposer le fichier ici** sous le nom exact :

   ```
   videos/teaser.mp4
   ```

3. Dans `index.html`, **décommenter** le bloc balisé
   « TEASER VIDÉO — À ACTIVER » (retirer `<!--` au début et `-->` à la fin).
4. **Corriger `og:video:width` / `og:video:height`** avec les vraies dimensions
   du fichier exporté :
   - Paysage conseillé pour l'aperçu social : `1280` × `720`.
   - Si le teaser est vertical (format story) : par ex. `1080` × `1920`.
5. *(facultatif mais recommandé)* Exporter une **image d'accroche** (une belle
   frame du teaser) en `1200×630` et la déposer sous :

   ```
   videos/teaser-poster.jpg
   ```

   puis, dans `index.html`, remplacer l'URL `og:image` par
   `https://aventicumquest.ch/videos/teaser-poster.jpg`
   (c'est la vignette affichée avant lecture).
6. Commit + push. Attendre le redéploiement GitHub Pages (1–2 min).
7. **Re-scraper** l'aperçu pour vider le cache des réseaux :
   - Facebook : https://developers.facebook.com/tools/debug/
   - LinkedIn : https://www.linkedin.com/post-inspector/

## Bon à savoir

- L'**aperçu vidéo lisible dans le fil** fonctionne surtout sur **Facebook**.
- **Twitter/X** n'accepte pas un `.mp4` brut (il faut une « Player Card » validée) —
  d'où l'absence de `twitter:player`. Twitter affichera l'`og:image`.
- **WhatsApp / LinkedIn / Instagram** affichent l'`og:image`, pas la vidéo.
  → Pour ces canaux, upload la vidéo **nativement** dans l'app (bien meilleur reach).
- Vérifier l'URL une fois en ligne : `https://aventicumquest.ch/videos/teaser.mp4`
  doit renvoyer **200** et se lire dans le navigateur.
