
var loadlevel = function(game, n){
    n = n - 1
    var level = levels[n]
    var blocks = []
    for(var i = 0; i < level.length; i++){
        var p = level[i] 
        var b = Block(game, p)        
        blocks.push(b)
    }
    return blocks
}
 
var blocks = []
var enableDebugNode = function(game, enable){
    if(!enable){
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if(event.key == 'p'){
            paused = !paused
        }else if('1234567'.includes(k)){
            blocks = loadlevel(game, Number(k))
        }
    })
    //控制 speed
    document.querySelector('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {

    var images = {
        ball:'img/ball.png',
        block:'img/block.png',
        paddle:'img/paddle.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = new SceneTitle(g)
        g.runWithScene(s)
    })
    
    enableDebugNode (game, true)
    
}
__main()