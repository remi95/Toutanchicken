function Gameover() {}

Gameover.prototype.create = function () {

  music = this.game.add.audio('victoireSong');
  music.loop = true;
  music.play();

  // BACKGROUND et ECRITURE
  this.add.sprite(0, 0, 'backgroundWin');

  var text = this.add.image(this.game.width * 0.3, this.game.height * 0.4, 'victoire');
  text.anchor.set(0.5);

  // POUSSIN
  var poussin = this.add.image(this.game.width * 0.7, this.game.height * 0.4, 'poussin_win');

  // this.input.onDown.add(this.onInputDown, this);


  // BOUTON
  var menu = this.game.add.button(this.game.width * 0.5, this.game.height * 0.8, 'menu', backToMenu, this);
  menu.anchor.set(0.5);

  echap = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
  thisGame = this;


  // POULET
  player = this.add.sprite(99, 143, 'chicken');
  this.physics.enable(player);
  player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
  player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true)
    ;

};

Gameover.prototype.update = function () {
	// this.game.physics.arcade.collide(player, text);
  if(player.body.x < 100){
    player.animations.play('right');
    player.body.velocity.x = 200;
  }
  if(player.body.x > 600){
    player.animations.play('left');
    player.body.velocity.x = -200;
  }
  if(player.body.y > 143){
      player.body.velocity.y = -30;
  }

  if(echap.isDown){
    backToMenu();
  }
}

function backToMenu(){
  music.stop();
	thisGame.state.start('menu');
}

Gameover.prototype.onInputDown = function () {
  // this.game.state.start('menu');
};

module.exports = Gameover;
