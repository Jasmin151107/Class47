class Boat {
    constructor(x,y,w,h,boatpos){
    this.body = Bodies.rectangle(x,y,w,h);
    this.w = w
    this.h = h;
    this.boatpos = boatpos
    this.boatImg = loadImage("boat2.png");
    World.add(world,this.body);
    }
    remove(index){
     setTimeout(()=>{
         World.remove(world,boats[index].body)
         delete boats[index]
     },2000)
    }
    display(){
    push()
    translate(this.body.position.x,this.body.position.y)
    rotate(this.body.angle)
    imageMode(CENTER)
    image(this.boatImg,0,this.boatpos,this.w,this.h)
    pop();
    }
}