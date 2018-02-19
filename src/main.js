const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'toutanchicken-game');

game.state.add('boot', require('./states/boot'));
game.state.add('game', require('./states/game'));
game.state.add('niveau2', require('./states/niveau2'));
game.state.add('menu', require('./states/menu'));
game.state.add('preloader', require('./states/preloader'));
game.state.add('gameover', require('./states/gameover'));
game.state.add('gamewin', require('./states/gamewin'));

game.state.start('boot');
