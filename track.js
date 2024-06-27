class Img_Mouse{
    /**
     * @param {String} mouse_img_url -图片地址
     * @param {String} wake_img_url -尾迹图片地址
     * @param {Number} width_mouse-宽
     * @param {Number} hight_mouse -高
     * @param {Object} option -配置  item_hight，item_width，item_speed分别是尾迹的高，宽，产生速度
    */
    constructor(mouse_img_url,wake_img_url,width_mouse,hight_mouse,option={'item_hight':30,'item_speed':50,'item_width':30}){
        this.mouse_img_url=mouse_img_url
        this.wake_img_url=wake_img_url
        this.width_mouse=width_mouse
        this.hight_mouse=hight_mouse
        this.mouse_now_top=0
        this.mouse_now_left=0
        this.option=option
    }
    init(){
        let mouse_box=document.createElement('div')
        mouse_box.style.position='absolute'
        mouse_box.style.zIndex='1999'
        let mouse_box_img=`
        <img src='${this.mouse_img_url}' style='width:${this.width_mouse}px;hight:${this.hight_mouse};'>
        `
        mouse_box.style.pointerEvents='none'
        mouse_box.innerHTML=mouse_box_img
        document.querySelector('body').appendChild(mouse_box)
        document.querySelector('body').style.cursor='none'
        let add_wake_de= this.throttle_fun(this.add_wake,this.option.item_speed)//100是尾迹的产生速度
        window.addEventListener('mousemove',(e)=>{
            mouse_box.style.display='block'
            requestAnimationFrame(()=>{
            mouse_box.style.transform= `translate(${e.offsetX}px,${e.clientY}px)`
            this.mouse_now_left=e.offsetX
            this.mouse_now_top=e.offsetY
            add_wake_de(e.offsetX,e.offsetY)
            })
        })
        document.querySelector('body').addEventListener('mouseout',()=>{
            mouse_box.style.display='none'
        })
    }
    throttle_fun(fun,time){
        let up_time=0
        return (x,y)=>{
            if(Date.now()-up_time>=time){
                fun.bind(this, x, y)()
                up_time=Date.now()
            }
        }
    }
    add_wake(x,y){
        let iem=document.createElement('div')
        iem.style.position='absolute'
        iem.style.top=y+'px'
        iem.style.left=x+'px'
        iem.style.pointerEvents='none'
        let item_img=`
        <img src='${this.wake_img_url}' style='width:100%;hight:100%;'>
        `
        iem.innerHTML=item_img
        document.querySelector('body').appendChild(iem)
        iem.style.zIndex='16666'
        iem.style.height=this.option.item_hight+'px'
        iem.style.width=this.option.item_width+'px'
        let star_height=this.option.item_hight
        let star_width=this.option.item_width
        let tiomout=  setInterval(()=>{
        requestAnimationFrame(()=>{
            star_height-=10
            star_width-=10
            iem.style.height=star_height+'px'
            iem.style.width=star_width+'px'
            if(star_height==0&&star_width==0){
                document.querySelector('body').removeChild(iem)
            }
            //clearInterval(tiomout)
            })
            
        },200)
    }
}

const pointer = new Img_Mouse('images/pointer.png','images/pointer.png',40,40);
pointer.init();
