class SceneEnd extends GuaScene{
    constructor(game){
        super(game)
        game.registerAction('r', function(){
            var s = new SceneTitle(game)
            game.replaceScene(s)
        })   
    }
    draw() {
        this.game.context.fillText('游戏结束，按 r 重玩', 170, 200)  
    }
    update() {

    }
}