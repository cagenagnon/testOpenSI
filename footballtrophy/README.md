# Football Trophy

**Football Trophy** est un petit jeu HTML5/JavaScript où le joueur doit attraper des balles qui tombent pour marquer des points. Le jeu inclut un système de score, un panneau de contrôle et un mode son activable/désactivable.

## Fonctionnalités

- Déplacement du joueur avec les touches gauche/droite.
- Génération aléatoire de balles tombantes.
- Comptage du score en temps réel.
- Gestion du Game Over lorsque la balle touche le bas du canvas.
- Lecture de musique de fond avec possibilité de mettre en pause ou de couper le son.
- Interface utilisateur avec panneau de contrôle et score affiché.

## Installation / Lancement

1. **Télécharger l'archive ZIP et extraire les fichiers.**


## Structure du projet

.
├── audio
│   └── Champions League Anthem (Full Version).mp3
├── footballtrophy.html
├── README.md
├── script.js
└── style.css


## Ouvrir le jeu

- Double-cliquer sur `footballtrophy.html` ou ouvrir le fichier dans un navigateur moderne (Chrome, Firefox).  
- Le jeu devrait se lancer directement dans le navigateur.

## Contrôles

### Déplacement du joueur

- **Flèche gauche** : se déplacer vers la gauche  
- **Flèche droite** : se déplacer vers la droite

### Boutons du panneau droit

- **Jouer** : démarrer une partie  
- **Pause** : mettre le jeu en pause  
- **Play** : reprendre le jeu après pause  
- **Activer/Désactiver le son** : activer ou couper la musique  
- **Rejouer** : disponible après un Game Over

## Technologies utilisées

- HTML5  
- CSS3  
- JavaScript 
- Audio 

## Personnalisation

- **Changer la musique** : remplacer le fichier `Champions League Anthem (Full Version).mp3` dans le dossier `audio`. 
- **Modifier le style du jeu** : éditer `style.css`.  
- **Modifier la vitesse ou fréquence des balles** : ajuster les variables `ball.speed` et `setInterval(createBall, 1000)` dans `script.js`.

