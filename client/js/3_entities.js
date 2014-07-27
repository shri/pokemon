/**
 * Player Entity
 */
game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(2, 2);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.gravity = 0;

        this.speed = 16;

        var sen = sense.init({});
        sen.orientation({
                alphaThreshold: 365,
                betaThreshold: 0.10,
                gammaThreshold: 0.10,
                radians: true
            },
            function(data) {
                gamma = data.gamma;
                beta = data.beta;
                me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
                me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
                me.input.triggerKeyEvent(me.input.KEY.UP, false);
                me.input.triggerKeyEvent(me.input.KEY.DOWN, false);
                if (Math.abs(gamma) > Math.abs(beta)) {
                    if (gamma > 0.10) {
                        me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
                    }
                    if (gamma < -0.10) {
                        me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
                    }
                } else {
                    if (beta < -0.10) {
                        me.input.triggerKeyEvent(me.input.KEY.UP, true);
                    }
                    if (beta > 0.10) {
                        me.input.triggerKeyEvent(me.input.KEY.DOWN, true);
                    }
                }
            }
        );


    },

    /* update the player pos */
    update: function(dt) {

        if (me.input.isKeyPressed('left')) {

            this.flipX(true);
            if (this.vel.x > -8) {
                this.vel.x = -this.speed * 1;
            }
        } else if (me.input.isKeyPressed('right')) {
            this.flipX(false);
            if (this.vel.x < 8) {
                this.vel.x = this.speed * 1;
            }
        } else if (me.input.isKeyPressed('up')) {
            if (this.vel.y > -8) {
                this.vel.y = -this.speed * 1;
            }
        } else if (me.input.isKeyPressed('down')) {
            if (this.vel.y < 8) {
                this.vel.y = this.speed * 1;
            }
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
                // let's flicker in case we touched an enemy
                // this.renderable.flicker(750);
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


game.EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "";

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // call the parent constructor
        this.parent(x, y, settings);

        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;

    },

    onCollision: function(res, obj) {
        console.log('grass');
        $('#battle-content').show();
        $('canvas').hide();
        // Meteor.render(Meteor.loadTemplate('battle'));
        me.game.world.removeChild(this);
    }
});