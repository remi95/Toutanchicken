'use strict';
  function Niveau2() {}

  var map;
  var layer;
  var cursors;
  var player;
  var croco;
  var croco2;
  var momie;
  var scarabe;
  var bulletTime = 0;
  var oneEgg = false;
  var smokeAnimation = false;
  var plumeAnimation = false;
  var scarabe_direction = 'right';
  var invincibilite;
  var thisGame = null;


  var weapon;
  var seeds;
  var graines;

  var cursors;
  var fireButton;

  var health = 3;
  var healthText;
  var score = 0;
  var scoreText;
  var youWin;


  Niveau2.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      // ---------------------------
    //          MUSIC 
    // ---------------------------

    music = this.game.add.audio('music1');
    music.loop = true;
    music.play();

  // ---------------------------
  //          MAP 
  // ---------------------------

  // On créé le background
    this.add.sprite(0, 0, 'background');

    // On créé la map (fichier JSON)
  map = this.add.tilemap('map2');
  // Quel Tileset utiliser pour les blocs ?
  map.addTilesetImage('desert32');
  // Quel Layer (calque) utiliser ?
  layer = map.createLayer('Calque de Tile 1');
  // On fait tout rentrer dans le cadre 800x640
  layer.resizeWorld();
  // Détermine les tiles sur lesquelles le joueur entrera en collision. On a 16 tiles dans le décor.
  map.setCollisionBetween(1, 16);

  // ---------------------------
  //          POULET 
  // ---------------------------

  // Le joueur : Arg1 et Arg2 = coordonnées de départ ; Arg3 = nom de la spritesheet déclarée en preload
  player = this.add.sprite(40, 507, 'chicken');
    // On active le moteur physique sur le joueur
  this.physics.enable(player);
  // Les propriétés physiques du joueur. On paramètre ici le rebond, la gravité, etc.
    player.body.bounce.y = 0.1; // Rebond
    player.body.gravity.y = 300; // Poids (gravité du joueur)
    player.body.collideWorldBounds = false;;

    // La caméra suit le joueur
  this.camera.follow(player);

  // Animation du joueur, marche vers la droite ou la gauche, saute, etc.
    // player.animations.add(key, framesarray, fps, repeat);
    player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true)
    ;
    player.animations.add('jump', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    
    },
    update: function() {
      // state update code
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    }
  };
module.exports = Niveau2;
