// 瓜

class GuaGame {
    constructor(fps, images, runCallbck){
        window.fps = fps
        this.images = images
        this.runCallbck = runCallbck
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })
        this.init()
    }

    static instance(...argus){
        this.i = this.i || new this(...argus)
        return this.i
    }
    drawImage(img){
        this.context.drawImage(img.image, img.x, img.y)
    }
    //update
    update = () => {
        this.scene.update()
    }

    //draw
    draw = () => {
        this.scene.draw()
    }

    //
    registerAction = (key, callback) => {
        this.actions[key] = callback
    }

    runloop = () =>{
        log(window.fps)
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        //next runloop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    imageByName = name => {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    runWithScene = scene => {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene = scene =>{
        this.scene = scene
    }
    __start(){
        this.runCallbck(this)
        // 开始运行程序
    }
    
    init = () =>{
        var g = this
        var loads = []
        //预先载入所有图片
        var names = Object.keys(g.images)
        for(var i = 0; i < names.length; i++){
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function(){
                //存入g.images
                g.images[name] = img
                //所有图片载入成功后，调用run
                loads.push(1)
                if(loads.length == names.length){
                    g.__start()
                }
            }   
        }
    }
}