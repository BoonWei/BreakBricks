var Block = function(game, position) {
    //position is [0, 0]
    var p = position
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        lifes: p[2] || 1,
        alive:true,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = function(){
        o.lifes--
        if(o.lifes < 1){
            o.alive = false;
        }
    }
    o.collide = function(b) {
        return o.alive && (rectIntersects(o, b) ||  rectIntersects(b, o))
    }
    return o;
}