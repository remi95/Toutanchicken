function Menu() {}


Menu.prototype.create = function () {

	music = this.game.add.audio('menu');
    music.loop = true;
    music.play();

	this.add.sprite(0, 0, 'background');


  var text = this.add.image(this.game.width * 0.5, this.game.height * 0.2, 'gamename');
  text.anchor.set(0.5);

  var niveau1 = this.game.add.button(this.game.width * 0.2, this.game.height * 0.5, 'niveau1', play1, this);
  var niveau2 = this.game.add.button(this.game.width * 0.6, this.game.height * 0.5, 'niveau2', play2, this);
  var controls = this.game.add.image(this.game.width * 0.5, this.game.height * 0.85, 'controls');
  controls.anchor.set(0.5);

  // this.input.onDown.add(this.onInputDown, this);


};

Menu.prototype.update = function () {

};

Menu.prototype.onInputDown = function () {
  // this.game.state.start('game');
};

function play1(){
	music.stop();
	this.game.state.start('game');
}
function play2(){
	music.stop();
	this.game.state.start('niveau2');
}

module.exports = Menu;
