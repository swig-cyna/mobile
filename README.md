# Mobile 📱

## Setup 🔩

1. Installer les packages

   ```bash
   pnpm install
   ```

2. Créer votre fichier .env

   Copiez le fichier .env.example et renommez-le en .env

   ```bash
   cp .env.example .env
   ```

3. Configurer les variables d'environnement

   Ouvrez le fichier .env et ajustez les variables selon votre environnement de développement

## Lancer l'application avec Expo Go 🚀

1. Installer l'application Expo Go sur votre appareil

   - Pour iOS : [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Pour Android : [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Démarrer le serveur de développement

   ```bash
   pnpm dev
   ```

3. Scanner le QR code

   - Sur iOS : Scannez le QR code avec l'application Appareil photo
   - Sur Android : Scannez le QR code avec l'application Expo Go

4. Options supplémentaires via le menu Metro Bundler

   - Appuyez sur `j` pour ouvrir l'inspecteur React Developer Tools
   - Appuyez sur `r` pour rafraîchir l'application
   - Appuyez sur `m` pour activer/désactiver le menu de développement
   - Appuyez sur `d` pour ouvrir le menu de débogage
   - Appuyez sur `a` pour ouvrir dans un émulateur Android
   - Appuyez sur `i` pour ouvrir dans un simulateur iOS

5. Connecter l'application au backend

   Assurez-vous que le backend est démarré et que l'URL est correctement configurée dans le fichier .env

   Si vous utilisez le backend sur votre machine locale :

   - Pour iOS (simulateur) : utilisez `localhost` comme hôte
   - Pour Android (émulateur) : utilisez `10.0.2.2` comme hôte
   - Pour des appareils physiques sur le même réseau WiFi : utilisez l'adresse IP de votre machine

## Commits 🚀

Utiliser les commandes de git et non pas les boutons dans VSCode

- Pour ajouter les fichiers modifiés, vous devez utiliser la commande
  ```bash
  git add .
  ```
- Pour commiter les changements, vous devez utiliser la commande
  ```bash
  git commit -m "<type>(scope): <description>"
  ```

Pour commit les changements, vous devez respecter les conventions suivantes:

- Commits de type `feat` pour les nouvelles fonctionnalités
- Commits de type `fix` pour les corrections de bugs
- Commits de type `chore` pour les changements d'infrastructure
- Commits de type `docs` pour les modifications de documentation
- Commits de type `style` pour les modifications de style
- Commits de type `refactor` pour les modifications de code sans changement de comportement

Exemples de commits:

- `fix(navigation): correction du bug de navigation`
- `feat(auth): ajout de la connexion avec Google`
- `docs(readme): mise à jour du README.md`
- `chore(deps): mise à jour des dépendances`
