function Gameover() {}

var entree;
var echap;

Gameover.prototype.init = function (levelName) {
  niveau = levelName.level;
};

Gameover.prototype.create = function () {

  // MUSIC

  musicOver = this.game.add.audio('musicOver');
  musicOver.loop = true;
  musicOver.stop();
  musicOver.play();

  // BACKGROUND ET ECRITURE

  this.add.sprite(0, 0, 'backgroundGameOver');

  var text = this.add.image(this.game.width * 0.5, this.game.height * 0.3, 'gameover');
  text.anchor.set(0.5);

  // this.input.onDown.add(this.onInputDown, this);

  // BOUTONS

  var replay = this.game.add.button(this.game.width * 0.5, this.game.height * 0.6, 'replay', replayLastLevel, this);
  replay.anchor.set(0.5);

  var menu = this.game.add.button(this.game.width * 0.5, this.game.height * 0.8, 'menu', backToMenu, this);
  menu.anchor.set(0.5);

  // TOUCHES

  entree = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  echap = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

  thisGame = this;

  // CREATION PLUME

  this.game.physics.arcade.gravity.y = 50;

  plume = this.add.sprite(this.game.width * 0.5, 0, 'plume');
  this.physics.enable(plume);
  plume.anchor.set(0.5);
  plume.animations.add('move', [0,1,2,3], 7, true);
  plume.body.collideWorldBounds = true;
};

Gameover.prototype.update = function () {

  // ANIMATION PLUME
	plume.animations.play('move');

  if(plume.body.onFloor()){
    plume.animations.stop();
  }

  // TOUCHES

  if(entree.isDown){
    replayLastLevel();
  }

  if(echap.isDown){ 
    backToMenu();
  }
};

function backToMenu(){
  musicOver.stop();  
	thisGame.state.start('menu');
}

function replayLastLevel(){
  musicOver.stop();  
  thisGame.state.start(niveau);
}

Gameover.prototype.onInputDown = function () {
  // this.game.state.start(niveau);
};

module.exports = Gameover;
