function Preloader() {
  this.asset = null;
  this.ready = false;
}

Preloader.prototype.preload = function () {
  this.game.load.tilemap('map', '/assets/tilemaps/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
  this.game.load.tilemap('map2', '/assets/tilemaps/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
  this.game.load.image('desert32', '/assets/tilemaps/tiles/desert32.png');
  this.game.load.spritesheet('chicken', '/assets/chicken.png', 54, 69);
  this.game.load.spritesheet('poussin', '/assets/poussin.png', 18, 22);
  this.game.load.image('background', '/assets/background.png');
  this.game.load.image('background2', '/assets/background2.png');
  this.game.load.image('backgroundGameOver', '/assets/bg_gameover2.png');
  this.game.load.image('backgroundWin', '/assets/bg_win.png');
  this.game.load.image('graine', '/assets/granou.png');
  this.game.load.image('seed', '/assets/seedtrue.png');
  this.game.load.spritesheet('croco', '/assets/croco.png', 69, 72);
  this.game.load.spritesheet('momie', '/assets/momie.png', 66, 72);   
  this.game.load.spritesheet('scarabe', '/assets/scarabe.png', 43, 24); 
  this.game.load.spritesheet('bats', '/assets/bats.png', 52, 56);
  this.game.load.spritesheet('scorpion', '/assets/scorpion.png', 60, 41);
  this.game.load.spritesheet('sphinx', '/assets/sphinx.png', 112, 128); 
  this.game.load.spritesheet('fumee', '/assets/fumee.png', 92, 80); 
  this.game.load.spritesheet('plume', '/assets/plume.png', 57, 36); 
  this.game.load.spritesheet('tornade', '/assets/tornade.png', 113, 209); 
  this.game.load.image('egg', '/assets/egg.png', 30, 31); 
  this.game.load.image('niveau1', '/assets/niveau1.png', 192, 74); 
  this.game.load.image('niveau2', '/assets/niveau2.png', 192, 74);
  this.game.load.image('menu', '/assets/menu2.png', 192, 74);  
  this.game.load.image('replay', '/assets/replay2.png', 192, 74);  
  this.game.load.image('controls', '/assets/controls.png', 600, 200);  
  this.game.load.image('gamename', '/assets/gamename.png', 600, 200);
  this.game.load.image('gameover', '/assets/gameover.png', 600, 200);
  this.game.load.image('victoire', '/assets/victoire.png', 600, 200);
  this.game.load.image('poussin_win', '/assets/poussin_win.png', 336, 396);
  this.game.load.spritesheet('angrychicken', 'assets/angrychicken.png', 54, 69);
  this.game.load.spritesheet('invincibilite', '/assets/invincibilites.png', 24, 24);
  this.game.load.image('arrow_right', '/assets/arrow_right.png', 32, 8); 
   
  this.game.load.audio('music1', '/assets/audio/Toutanchicken1.wav');
  this.game.load.audio('chickenJump', '/assets/audio/Chicken_jump.wav');
  this.game.load.audio('chickenRun', '/assets/audio/Chicken_run.wav');
  this.game.load.audio('eggPop', '/assets/audio/Egg_pop2.wav');
  this.game.load.audio('musicOver', '/assets/audio/GameOver.wav');
  this.game.load.audio('menu', '/assets/audio/menu.wav');
  this.game.load.audio('musicWin', '/assets/audio/poussin.wav');
  this.game.load.audio('loose', '/assets/audio/loose.wav');
  this.game.load.audio('victoireSong', '/assets/audio/victoire.wav');

  this.game.load.bitmapFont('carrier_command', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');
  // this.game.load.bitmapFont('theminion', 'assets/font/theminion.ttf', 'assets/font/theminion.otf');
};

Preloader.prototype.loadResources = function () {
  // load your resources here
};

Preloader.prototype.create = function () {

};

Preloader.prototype.update = function () {
  // if (!!this.ready) {
    this.game.state.start('menu');
  // }
};

Preloader.prototype.onLoadComplete = function () {
  // this.ready = true;
};

module.exports = Preloader;
