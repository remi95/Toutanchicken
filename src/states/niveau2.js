function Game() {}

var map;
var layer;
var cursors;
var player;
var bats;
var bats2;
var croco;
var croco2;
var momie;
var scarabe;
var sphinx;
var sphinx2;
var sphinx3;
var tornade;
var bulletTime = 0;
var oneEgg = false;
var smokeAnimation = false;
var smokeAnim2 = false;
var plumeAnimation = false;
var winner = false;
var scarabe_direction = 'right';
var invincibilite;
var thisGame = null;

var weapon;
var seeds;
var graines;

var cursors;
var fireButton;
var spacebar;

var bonusText;
var score = 0;
var scoreText;
var youWin;
var angry = false;

Game.prototype.create = function () {

    // ---------------------------
    //          MUSIC 
    // ---------------------------

    music = this.game.add.audio('music1');
    music.loop = true;
    music.play();

    chickenJump = this.game.add.audio('chickenJump');
    chickenJump.loop = false;
    chickenJump.volume = 0.5;

    chickenRun = this.game.add.audio('chickenRun');
    chickenRun.loop = false;

    eggPop = this.game.add.audio('eggPop');
    eggPop.loop = false;    
    eggPop.volume = 0.4;

    musicWin = this.game.add.audio('musicWin');
    musicWin.loop = false;

    loose = this.game.add.audio('loose');
    loose.loop = false;

	// ---------------------------
	//          MAP 
	// ---------------------------

	// On créé le background
    this.add.sprite(0, 0, 'background2');

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


	// Gravité du monde
	this.physics.arcade.gravity.y = 500;

	// ---------------------------
	//          POULET 
	// ---------------------------

	// Le joueur : Arg1 et Arg2 = coordonnées de départ ; Arg3 = nom de la spritesheet déclarée en preload
	player = this.add.sprite(40, 123, 'chicken');
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

    spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // ---------------------------
	//           CROCO 
	// ---------------------------

	// Les crocodiles : Arg1 et Arg2 = coordonnées de départ ; Arg3 = nom de la spritesheet déclarée en preload
	croco = this.add.sprite(1889, 507, 'croco');
	croco2 = this.add.sprite(3293, 347, 'croco');
    // On active le moteur physique sur les crocodiles
	this.physics.enable(croco);
	this.physics.enable(croco2);

	// Animation des crocodiles
	croco.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	croco.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	croco2.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	croco2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

	// ---------------------------
	//           MOMIE 
	// ---------------------------

    // The momie and its settings
    momie = this.add.sprite(2779, 507, 'momie');
    momie2 = this.add.sprite(3952, 155, 'momie');

    //  We need to enable physics on the momie
    this.physics.arcade.enable(momie);
    this.physics.arcade.enable(momie2);

    //  Player physics properties. Give the little guy a slight bounce.
    momie.body.bounce.y = 0.2;
    momie.body.gravity.y = 300;
    momie.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    momie.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    momie.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    momie2.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    momie2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

    // ---------------------------
	//           SCARABE 
	// ---------------------------

    // The scarabe and its settings
    scarabe = this.add.sprite(2386, 347, 'scarabe');

    //  We need to enable physics on the scarabe
    this.physics.arcade.enable(scarabe);

    //  Player physics properties. Give the little guy a slight bounce.
    scarabe.body.bounce.y = 0.2;
    scarabe.body.gravity.y = 50;
    scarabe.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    scarabe.animations.add('left', [7, 8, 9], 10, true);
    scarabe.animations.add('right', [0, 1, 2], 10, true);
    scarabe.animations.add('fly', [4, 5], 10, true);
    // scarabe.animations.add('jump', [3], 10, true);


    // ---------------------------
	//           BATS 
	// ---------------------------

    // The bats and its settings
    bats = this.add.sprite(3968, 270, 'bats');
    bats2 = this.add.sprite(5390, 340, 'bats');

    //  We need to enable physics on the bats
    this.physics.arcade.enable(bats);
    this.physics.arcade.enable(bats2);

    //  Player physics properties. Give the little guy a slight bounce.
    bats.body.collideWorldBounds = true;
    bats2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    bats.animations.add('left', [4, 5, 6, 7], 10, true);
    bats.animations.add('right', [0, 1, 2, 3], 10, true);
    bats2.animations.add('left', [4, 5, 6, 7], 10, true);
    bats2.animations.add('right', [0, 1, 2, 3], 10, true);


    // ---------------------------
	//           SCORPION 
	// ---------------------------

    // The scorpion and its settings
    scorpion = this.add.sprite(1785, 123, 'scorpion');
    scorpion2 = this.add.sprite(5491, 411, 'scorpion');

    //  We need to enable physics on the scorpion
    this.physics.arcade.enable(scorpion);
    this.physics.arcade.enable(scorpion2);

    //  Player physics properties. Give the little guy a slight bounce.
    scorpion.body.collideWorldBounds = true;
    scorpion2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    scorpion.animations.add('left', [4, 5, 6, 7], 10, true);
    scorpion.animations.add('right', [0, 1, 2, 3], 10, true);
    scorpion.animations.add('full', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    scorpion2.animations.add('left', [4, 5, 6, 7], 10, true);
    scorpion2.animations.add('right', [0, 1, 2, 3], 10, true);
    scorpion2.animations.add('full', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);


    // ---------------------------
	//           EGGS 
	// ---------------------------


	bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1, 'egg');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('body.bounce.y', 0.3);


    // ---------------------------
	//           POUSSIN 
	// ---------------------------


	// The poussin and its settings
    poussin = this.add.sprite(6310, 530, 'poussin');

    //  We need to enable physics on the poussin
    this.physics.arcade.enable(poussin);

    //  Player physics properties. Give the little guy a slight bounce.
    poussin.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    poussin.animations.add('move', [0,1], 7, true);
    // poussin.animations.add('jump', [3], 10, true);


    // ---------------------------
	//           SPHINX 
	// ---------------------------

    // The sphinx and its settings
    sphinx = this.add.sprite(830, 300, 'sphinx');
    sphinx2 = this.add.sprite(1025, 400, 'sphinx');
    sphinx3 = this.add.sprite(1220, 300, 'sphinx');

    //  We need to enable physics on the sphinx
    this.physics.arcade.enable(sphinx);
    this.physics.arcade.enable(sphinx2);
    this.physics.arcade.enable(sphinx3);

    //  Player physics properties. Give the little guy a slight bounce.
    sphinx.body.bounce.y = 0.1;
    sphinx.body.collideWorldBounds = true;
    sphinx2.body.bounce.y = 0.1;
    sphinx2.body.collideWorldBounds = true;
    sphinx3.body.bounce.y = 0.1;
    sphinx3.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    sphinx.animations.add('move', [0,1,2,3,4], 6, true);
    sphinx2.animations.add('move', [0,1,2,3,4], 6, true);
    sphinx3.animations.add('move', [0,1,2,3,4], 6, true);


    // ---------------------------
	//           ARROWS 
	// ---------------------------

    arrowRight = this.add.sprite(1888, 235, 'arrow_right');
    this.physics.arcade.enable(arrowRight);
    arrowRight.body.collideWorldBounds = true;

    arrowRight2 = this.add.sprite(1888, 310, 'arrow_right');
    this.physics.arcade.enable(arrowRight2);
    arrowRight2.body.collideWorldBounds = true;

    arrowRight3 = this.add.sprite(1888, 385, 'arrow_right');
    this.physics.arcade.enable(arrowRight3);
    arrowRight3.body.collideWorldBounds = true;


    speedArrow = this.add.sprite(3200, 590, 'arrow_right');
    this.physics.arcade.enable(speedArrow);
    speedArrow.body.collideWorldBounds = true;


    // ---------------------------
	//           TORNADE 
	// ---------------------------

    tornade = this.add.sprite(2650, 350, 'tornade');
    this.physics.arcade.enable(tornade);
    tornade.body.collideWorldBounds = true;

    tornade2 = this.add.sprite(4950, 100, 'tornade');
    this.physics.arcade.enable(tornade2);
    tornade2.body.collideWorldBounds = true;

    tornade.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 10, true);
    tornade2.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 10, true);


	// ---------------------------
	//           GRAINES 
	// ---------------------------

	// Le groupe contenant les graines
	graines = this.add.group();
	// On active le moteur physique pour chaque graine du groupe
		graines.enableBody = true;

		// On créé 12 graines
	for (var i = 1; i < 25; i++)
    {
        // Créé une graine dans le groupe 'graines'
        var graine = graines.create(i * 290, 500, 'graine');
        // Active la gravité sur la graine (elle tombe au sol)
        graine.body.gravity.y = 300;
    }

    score = 0;

	// ---------------------------
	//           BONUS 
	// ---------------------------

    invincibilite = this.add.sprite(4530, 50, 'invincibilite');
    
    this.physics.arcade.enable(invincibilite);
    invincibilite.body.collideWorldBounds = true;
    invincibilite.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 8, true);


    // ---------------------------
	//           AUTRES 
	// ---------------------------

    // Gestion du score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '25px', fill: '#000' });
    scoreText.fixedToCamera = true;

    // Les contrôles du joueur
    cursors = this.input.keyboard.createCursorKeys();

	// Ecriture WIN
	youWin = this.add.bitmapText(6000, 200, 'carrier_command', 'Bravo !', 34);
	youWin.visible = false;
	// youWin.fixedToCamera = true;
	youWin.anchor.x = 0.5;
	youWin.anchor.y = 0.5;

	oneGameOver = false;
    oneEgg = false;
    smokeAnimation = false;
    smokeAnim2 = false;
    plumeAnimation = false;
    winner = false;
    oneGameOver = false;
    angry = false;

    thisGame = this;
}


Game.prototype.update = function () {

// Le joueur entre en collision avec les plate-formes
	var hitPlatform = this.game.physics.arcade.collide(player, layer);

	// Idem entre les différents éléments du jeu
	this.game.physics.arcade.collide(graines, layer);
	this.game.physics.arcade.collide(croco, layer);
	this.game.physics.arcade.collide(croco2, layer);
	this.game.physics.arcade.collide(momie, layer);
	this.game.physics.arcade.collide(momie2, layer);
	this.game.physics.arcade.collide(scarabe, layer);
	this.game.physics.arcade.collide(bats, layer);
	this.game.physics.arcade.collide(bats2, layer);
	this.game.physics.arcade.collide(scorpion, layer);
	this.game.physics.arcade.collide(scorpion2, layer);
	this.game.physics.arcade.collide(bullets, layer);
	this.game.physics.arcade.collide(poussin, layer);
	this.game.physics.arcade.collide(sphinx, layer);
	this.game.physics.arcade.collide(sphinx2, layer);
	this.game.physics.arcade.collide(sphinx3, layer);
	this.game.physics.arcade.collide(invincibilite, layer);
	this.game.physics.arcade.collide(arrowRight, layer);
	this.game.physics.arcade.collide(arrowRight2, layer);
	this.game.physics.arcade.collide(arrowRight3, layer);
	this.game.physics.arcade.collide(speedArrow, layer);
	this.game.physics.arcade.collide(tornade, layer);


	// On vérifie si le joueur mange une graine, si c'est le cas, on appelle la fonction collectGraine
	this.game.physics.arcade.overlap(player, graines, collectGraine, null, this);
	// On vérifie si le joueur touche un crocodile, si c'est le cas, on appelle la fonction collideCroco
	this.game.physics.arcade.overlap(player, croco, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, croco2, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, momie, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, momie2, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, scarabe, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, bats, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, bats2, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, scorpion, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, scorpion2, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, sphinx, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, sphinx2, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, sphinx3, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, arrowRight, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, arrowRight2, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, arrowRight3, collideEnnemy, null, this);
	this.game.physics.arcade.overlap(player, speedArrow, collideEnnemy, null, this);

	this.game.physics.arcade.overlap(player, invincibilite, TouchBoostedEgg, null, this);

	this.game.physics.arcade.overlap(bullets, momie, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, momie2, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, croco, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, croco2, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, scarabe, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, bats, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, bats2, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, scorpion, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, scorpion2, collideEgg, null, this);
	this.game.physics.arcade.overlap(bullets, layer, deleteEgg, null, this);


	this.game.physics.arcade.overlap(player, poussin, winLevel, null, this);

	// ---------------------------
	//       PLAYER MOVES
	// ---------------------------

    // On initialise la vitesse du joueur à 0
    player.body.velocity.x = 0;

    	
	if (cursors.left.isDown)
    {
        // Déplacement à gauche (recule)
        player.body.velocity.x = -200;
		// Lance l'animantion 'left'
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        // Déplacement à droite (avance)
        player.body.velocity.x = 200;
        player.animations.play('right');
    }
    
    else
    {
        // Joueur s'arrête

        if(cursors.left.timeUp > cursors.right.timeUp){
        	player.animations.stop();
       		player.frame = 13;
        }
        else{
        	player.animations.stop();
        	player.frame = 2;
        }
        
    }
    
    // Permet au joueur de sauter s'il est sur une plate-forme
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -500;
        player.animations.play('jump');
        if(!plumeAnimation){
            chickenJump.play();
        }
    }

    if ((cursors.down.isDown || spacebar.isDown) && bullets.total == 0 && player.alive == true && !plumeAnimation)
    {
		fireBullet();
		eggPop.play();
		oneEgg = true;
    }

	if (player.y > thisGame.world.height){
		player.kill();
		gameOver();
	}


	// ---------------------------
	//        CROCO MOVES
	// ---------------------------

    if(croco.body.x > 2025){
        croco.animations.play('left');
        croco.body.velocity.x = -100;
    }
    if(croco.body.x < 1890){
        croco.animations.play('right');
        croco.body.velocity.x = 100;
    }

    // CROCO 2

    if(croco2.body.x > 3575){
        croco2.animations.play('left');
        croco2.body.velocity.x = -100;
    }
    if(croco2.body.x < 3295){
        croco2.animations.play('right');
        croco2.body.velocity.x = 100;
    }

    // ---------------------------
	//        MOMIE MOVES
	// ---------------------------

    if(momie.body.x > 2950){
        momie.animations.play('left');
        momie.body.velocity.x = -50;
    }
    if(momie.body.x < 2780){
        momie.animations.play('right');
        momie.body.velocity.x = 50;
    }

    // MOMIE 2

    if(momie2.body.x > 4155){
        momie2.animations.play('left');
        momie2.body.velocity.x = -50;
    }
    if(momie2.body.x < 3955){
        momie2.animations.play('right');
        momie2.body.velocity.x = 50;
    }

    // ---------------------------
	//        SCARABE MOVES
	// ---------------------------

	if(scarabe.body.x < 2390){
        scarabe_direction = 'right';
    	scarabe.body.velocity.x = 50;
    	scarabe.animations.play('right');
    }
    if(scarabe.body.x > 2590){
        scarabe_direction = 'left';
    	scarabe.body.velocity.x = -50;
    	scarabe.animations.play('left');
    }


    // ---------------------------
	//        BATS MOVES
	// ---------------------------

	// BATS 1
    if(bats.body.x < 3970){
        bats.animations.play("right");
        bats.body.velocity.x = 100;
    }
    if(bats.body.x > 4430){
        bats.animations.play("left");
        bats.body.velocity.x = -100;
    }

    // Ne descend pas trop
    if(bats.body.y > 270){
       	bats.body.velocity.y = -60;
    }

    // BATS 1
    if(bats2.body.x < 5392){
        bats2.animations.play("right");
        bats2.body.velocity.x = 100;
    }
    if(bats2.body.x > 5879){
        bats2.animations.play("left");
        bats2.body.velocity.x = -100;
    }

    // Ne descend pas trop
    if(bats2.body.y > 340){
       	bats2.body.velocity.y = -60;
    }


    // ---------------------------
	//        SCORPION MOVES
	// ---------------------------

	scorpion.animations.play('full');
	scorpion2.animations.play('full');


	// ---------------------------
	//        POUSSIN MOVES
	// ---------------------------

	poussin.animations.play('move');


	// ---------------------------
	//        SPHINX MOVES
	// ---------------------------

	sphinx.animations.play('move');
	sphinx2.animations.play('move');
	sphinx3.animations.play('move');

	if(sphinx.body.onFloor()){
		sphinx.body.velocity.y = -380;
	}
	if(sphinx2.body.onFloor()){
		sphinx2.body.velocity.y = -380;
	}
	if(sphinx3.body.onFloor()){
		sphinx3.body.velocity.y = -380;
	}


	// ---------------------------
	//        ARROWS MOVES
	// ---------------------------
    
	//Flèche 1
    if(arrowRight.body.x <2026){
    	arrowRight.body.velocity.x = 250;
    }
    if(arrowRight.body.onWall() && player.body.x < 2300){
    	resetArrow(arrowRight, 1888, 235);
    }
	if(arrowRight.body.y > 235){
       	arrowRight.body.velocity.y = -10;
    }
    
	//Flèche 2
    if(arrowRight2.body.x <2026){
    	arrowRight2.body.velocity.x = 250;
    }
    if(arrowRight2.body.onWall() && player.body.x < 2300){
    	resetArrow(arrowRight2, 1888, 310);
    }
	if(arrowRight2.body.y > 310){
       	arrowRight2.body.velocity.y = -10;
    }

	//Flèche 3
    if(arrowRight3.body.x <2026){
    	arrowRight3.body.velocity.x = 250;
    }
    if(arrowRight3.body.onWall() && player.body.x < 2300){
    	resetArrow(arrowRight3, 1888, 385);
    }
	if(arrowRight3.body.y > 385){
       	arrowRight3.body.velocity.y = -10;
    }

    //Flèche Rapide
    if(speedArrow.body.x <3690){
    	speedArrow.body.velocity.x = 500;
    }
    if(speedArrow.body.onWall() && player.body.x < 3700){
    	resetArrow(speedArrow, 3200, 590);
    }
	if(speedArrow.body.y > 590){
       	speedArrow.body.velocity.y = -10;
    }

    // ---------------------------
	//        TORNADE MOVES
	// ---------------------------

	tornade.animations.play('move');

	if(tornade.body.y > 350){
       	tornade.body.velocity.y = -30;
    }
    if(player.body.x > 2620 && player.body.x < 2735){	
    	player.body.velocity.y = 450;
    }

    tornade2.animations.play('move');

	if(tornade2.body.y > 100){
       	tornade2.body.velocity.y = -30;
    }
    if(player.body.x > 4895 && player.body.x < 5005){	
    	player.body.velocity.y = 400;
    }

    // ---------------------------
    //        BONUS MOVES
    // ---------------------------

    invincibilite.animations.play('move');

}


Game.prototype.onInputDown = function () {
  // this.game.state.start('gameover');
};

function gameOver(){
	if(angry){
        ChangeSpriteToNormal();
    }

    music.stop();
    levelName = {
		level: 'niveau2'
	};

    thisGame.state.start('gameover', true, false, levelName);
}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    // if (this.game.time.now > bulletTime)
    // {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x +15, player.y +50);
            bullet.body.velocity.y = 400;
            // bulletTime = this.game.time.now + 200;
        }
    // }
}


function collectGraine (player, graine) {
	    
    // Removes the graine from the screen
    graine.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score;
    /*health -= 1;
    healthText.text = 'Health : '+ health +' lifes';*/


}

function collideEnnemy (player, ennemy){

	if(angry == false){
    	if(!smokeAnimation){

    		if(!plumeAnimation){
    			plumeAnim(player);
    		}

    		plumeAnimation = true;
    				
    		setTimeout(function(){
    			player.kill();
    		}, 450);

    		if(!oneGameOver){
                loose.play();
                music.fadeOut(1200)
                setTimeout(function(){
                    plumeAnimation = false;
                    gameOver();
                }, 1000);
            }

            oneGameOver = true;
    	}
    }
    else if(angry == true){
        ennemy.kill();
        score += 20;
        scoreText.text = 'Score: ' + score;
    }

}

function collideEgg (ennemy, bullet){

	if(!smokeAnimation){
		smokeAnim(ennemy);				
	}

	smokeAnimation = true;

	setTimeout(function(){
		ennemy.kill();
		score += 1;
        scoreText.text = 'Score: ' + score;
	}, 450);
	
	setTimeout(function(){
		
		bullet.kill();
		smokeAnimation = false
	}, 1000);			
}

function smokeAnim(ennemy){
	ennemy.body.velocity.x = 0;

	ennemy.loadTexture('fumee', 0);

	ennemy.animations.add('move', [0,1,2,3,4], 10, true);

	ennemy.animations.play('move', false, true);
	
}

function plumeAnim(player){
	player.body.velocity.x = 0;
	player.body.velocity.y = -50;

	player.loadTexture('plume');

	player.animations.add('move', [0,1,2,3], 7, true);

	player.animations.play('move', true);
	
}

function deleteEgg (bullet){
	if(oneEgg){
		setTimeout(function(){
			bullet.kill();
		}, 1000);
	}
	oneEgg = false;
	return oneEgg;	
}

function resetArrow(arrow, xpos, ypos){
	arrow.body.velocity.x = 0;
	setTimeout(function(){
		arrow.reset(xpos, ypos);
	}, 500);
}

function TouchBoostedEgg (player, special_egg) {
	//le poulet devient chuck norris
    angry = true;
    // activer la fumée lors de la destruction de l'oeuf colere
    if(!smokeAnimation || !smokeAnim2){
       smokeAnim(special_egg);             
    }

    smokeAnim2 = true;

    setTimeout(function(){
        special_egg.kill();
    }, 450);
                
    // changement de sprite au niveau du chicken. 
        
    player.loadTexture("angrychicken", 0);

    //gestion du temps du bonus angry
    // chrono de 10 secondes :
    bonusText = thisGame.add.text(this.game.width * 0.8, 16, '', { fontSize: '31px', fill: '#f6bb1a' });
    bonusText.fixedToCamera = true;

    // Décompte de 10s
    decompte();

    //et après 10 secondes on revient à la normale
    setTimeout(ChangeSpriteToNormal, 10000);
}

function decompte(){
    for(var i=0; i<10; i++){
        (function(i){
            setTimeout(function(){
                bonusText.text = 'Bonus :'+ i +'s';
            }, 1000*i);
        })(i+1);
    }
}


function ChangeSpriteToNormal(){
    if(angry){
        bonusText.destroy();
        player.loadTexture("chicken", 0);
        angry = false;
    }
}

function winLevel (player, poussin){
	if(!winner){
		music.fadeOut(2000);
        musicWin.play();
        youWin.visible = true;
        setTimeout(function(){
            music.stop();    
            thisGame.state.start('gamewin');
        }, 1500); 
    }
	winner = true;
}

module.exports = Game;
