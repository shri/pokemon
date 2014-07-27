/**
 * Player Entity
 */
game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(16, 16);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.collidable = true;
        this.gravity = 0;

        this.speed = 4;


    },

    /* -----

		update the player pos
		
	  ------			*/
    update: function(dt) {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            // this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.speed * 1;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            // this.flipX(false);
            // update the entity velocity
            this.vel.x += this.speed * 1 ;
        } else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            // this.flipX(false);
            // update the entity velocity
            this.vel.y -= this.speed * 1 ;
        } else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            // this.flipX(false);
            // update the entity velocity
            this.vel.y += this.speed * 1 ;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        // check & update player movement
        this.updateMovement();

        // check for collision
        var res = me.game.world.collide(this);

        if (res) {
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                if ((res.y > 0) && !this.jumping) {
                    // bounce (force jump)
                    this.falling = false;
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
                    // play some audio
                    me.audio.play("stomp");
                } else {
                    // let's flicker in case we touched an enemy
                    this.renderable.flicker(750);
                }
            }
        }


        // update animation
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent(dt);
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});