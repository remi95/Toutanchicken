function Game() {}

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
var smokeAnim2 = false;
var plumeAnimation = false;
var winner = false;
var oneGameOver = false;
var scarabe_direction = 'right';
var invincibilite;
var thisGame = null;


var weapon;
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
    this.add.sprite(0, 0, 'background');

    // On créé la map (fichier JSON)
	map = this.add.tilemap('map');
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

    spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    

    // ---------------------------
	//           CROCO 
	// ---------------------------

	// Les crocodiles : Arg1 et Arg2 = coordonnées de départ ; Arg3 = nom de la spritesheet déclarée en preload
	croco = this.add.sprite(725, 510, 'croco');
	croco2 = this.add.sprite(3652, 507, 'croco');
    // On active le moteur physique sur les crocodiles
	this.physics.enable(croco);
	this.physics.enable(croco2);



    // Gravité du monde
	this.physics.arcade.gravity.y = 500;

	// Animation des crocodiles
	croco.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	croco.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	croco2.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	croco2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

	// ---------------------------
	//           MOMIE 
	// ---------------------------

    // The momie and its settings
    momie = this.add.sprite(2396, 347, 'momie');
    momie2 = this.add.sprite(5102, 251, 'momie');

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
    scarabe = this.add.sprite(2875, 264, 'scarabe');

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
    bats = this.add.sprite(4795, 350, 'bats');
    bats2 = this.add.sprite(5715, 220, 'bats');

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
    scorpion = this.add.sprite(1010, 283, 'scorpion');
    scorpion2 = this.add.sprite(1781, 123, 'scorpion');

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
    poussin = this.add.sprite(6260, 443, 'poussin');

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
    sphinx = this.add.sprite(4200, 300, 'sphinx');

    //  We need to enable physics on the sphinx
    this.physics.arcade.enable(sphinx);

    //  Player physics properties. Give the little guy a slight bounce.
    sphinx.body.bounce.y = 0.1;
    sphinx.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    sphinx.animations.add('move', [0,1,2,3,4], 6, true);
    // sphinx.animations.add('jump', [3], 10, true);


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
        var graine = graines.create(i * 250, 550, 'graine');
        // Active la gravité sur la graine (elle tombe au sol)
        graine.body.gravity.y = 300;
    }

    score = 0;

	// ---------------------------
	//           BONUS 
	// ---------------------------

    invincibilite = this.add.sprite(2800, 500, 'invincibilite');
    
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
	this.game.physics.arcade.collide(invincibilite, layer);


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
       if(angry == false){
            // Déplacement à gauche
            player.body.velocity.x = -200;
            // Lance l'animantion 'left'
            player.animations.play('left');
        }
        else if(angry == true){
            //Déplacement à gauche 
            player.body.velocity.x = -300;
            player.animations.play('left');
        }
    }
    else if (cursors.right.isDown)
    {
        if(angry == false){
            // Déplacement à droite (avance)
            player.body.velocity.x = 200;
            player.animations.play('right');
        }
        else if(angry == true){
            //Déplacement à droite 
            player.body.velocity.x = 300;
            player.animations.play('right');
        }
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

    if(croco.body.x > 720){
        croco.animations.play('left');
        croco.body.velocity.x = -80;
    }
    if(croco.body.x < 400){
        croco.animations.play('right');
        croco.body.velocity.x = 80;
    }

    // CROCO 2

    if(croco2.body.x > 3880){
        croco2.animations.play('left');
        croco2.body.velocity.x = -80;
    }
    if(croco2.body.x < 3655){
        croco2.animations.play('right');
        croco2.body.velocity.x = 80;
    }

    // ---------------------------
	//        MOMIE MOVES
	// ---------------------------

    if(momie.body.x > 2760){
        momie.animations.play('left');
        momie.body.velocity.x = -50;
    }
    if(momie.body.x < 2400){
        momie.animations.play('right');
        momie.body.velocity.x = 50;
    }

    // MOMIE 2

    if(momie2.body.x > 5425){
        momie2.animations.play('left');
        momie2.body.velocity.x = -50;
    }
    if(momie2.body.x < 5105){
        momie2.animations.play('right');
        momie2.body.velocity.x = 50;
    }

    // ---------------------------
	//        SCARABE MOVES
	// ---------------------------

	// Demi-tour 
	if(scarabe.body.x < 2880){
        scarabe_direction = 'right';
    	scarabe.body.velocity.x = 50;
    	scarabe.animations.play('right');
    }

    // 1° Plateforme
    if(scarabe.body.x > 2880 && scarabe.body.x < 3110){
    	if(scarabe_direction == 'right'){
    		scarabe.body.velocity.x = 50;
    		scarabe.animations.play('right');
    	}
    	else if(scarabe_direction == 'left'){
    		scarabe.body.velocity.x = -50;
    		scarabe.animations.play('left');
    	}
    }

    // Vol
	if(scarabe.body.x > 3110 && scarabe.body.x < 3280){
   		scarabe.animations.play('fly');
	}

	// 2° Plateforme
    if(scarabe.body.x > 3280 && scarabe.body.x < 3490){
    	if(scarabe_direction == 'right'){
    		scarabe.body.velocity.x = 50;
    		scarabe.animations.play('right');
    	}
    	else if(scarabe_direction == 'left'){
    		scarabe.body.velocity.x = -50;
    		scarabe.animations.play('left');
    	}
    }

    // Demi-tour
    if(scarabe.body.x > 3490){
    	scarabe_direction = 'left';
    	scarabe.body.velocity.x = -50;
    	scarabe.animations.play('left');
    }

    // Reste à la même hauteur en vol
    if(scarabe.body.y > 264){
       	scarabe.body.velocity.y = -30;
    }


    // ---------------------------
	//        BATS MOVES
	// ---------------------------

	// BATS 1
    if(bats.body.x < 4800){
        bats.animations.play("right");
        bats.body.velocity.x = 100;
    }
    if(bats.body.x > 5075){
        bats.animations.play("left");
        bats.body.velocity.x = -100;
    }

    // Ne descend pas trop
    if(bats.body.y > 370){
       	bats.body.velocity.y = -60;
    }

    // BATS 1
    if(bats2.body.x < 5720){
        bats2.animations.play("right");
        bats2.body.velocity.x = 100;
    }
    if(bats2.body.x > 6070){
        bats2.animations.play("left");
        bats2.body.velocity.x = -100;
    }

    // Ne descend pas trop
    if(bats2.body.y > 220){
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

	if(sphinx.body.onFloor()){
		sphinx.body.velocity.y = -380;
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
        level: 'game'
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
