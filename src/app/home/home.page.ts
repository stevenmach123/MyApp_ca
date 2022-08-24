import {Component,ElementRef,Renderer2,ViewChild,AfterViewInit,Input,OnInit,EventEmitter,HostListener,ApplicationRef,NgZone} from '@angular/core';
import { AngularDelegate } from '@ionic/angular';
import {Router,ActivatedRoute }from  '@angular/router';
import {Location} from '@angular/common';

import {food, dbfood, total_intake} from '../allClass';
import {Service1} from '../service1';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
  host:{
    '(document:click)': 'outClick($event)'
    
  },
})
export class HomePage {
  @ViewChild('quan') quan$: ElementRef<HTMLInputElement>;
  @ViewChild('calo') calo$: ElementRef<HTMLInputElement>;
  months = {
    1:"January",
    2:"Feburary",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
}


  array_item:string[] =[];
  
  id_month:number =8;
  id_day:number = 21;
  is_month:string ="August";
  
  day_id:string;
  constructor(private rd: Renderer2,private sum_box:ElementRef, private router:Router,private route: ActivatedRoute ,private currentActivatedRoute:ActivatedRoute, private location :Location,  
   private service1 :Service1) {
  
    console.log("home constructor");  
   // this.router.navigate(['home/calendar']);
   this.day_id  =this.id_month.toString() +"-"+ this.id_day.toString() ;
   this.is_month = this.months[this.id_month];
    let er = new Map<number,number>();
    
    
    
  
  };

  
 ngOnInit(){

  
 }

   

  

ngAfterViewInit(){

  this.service1.Serviceday_id.subscribe(  (val)=>{
    this.new_item =0; this.new_item_hid=true;
    this.day_id = val;
    let current =this.day_id.split("-");
    this.updateMd(current);
    this.store_release(this.day_id);
  }

 )
  console.log("after view")
  
}


updateMd(ha:string[]){
  this.id_month = parseFloat(ha[0]);
  this.is_month = this.months[this.id_month] ;
  this.id_day =parseFloat(ha[1]);
  
}
k_d:Map<string,boolean> =new Map<string,boolean>() ;
naviCalendar(){
 
  
  if(this.food_stored.length>0){
    this.k_d.set(this.day_id,true)
  }
  else{
    this.k_d.set(this.day_id,false);
  }


  this.router.navigate(['home/calendar'],{state:{kd:this.k_d} });
}
 
 ngOnDestroy(){
  console.log("main destroy");
 }
  

 display_arrow:boolean =true;
 hi(e:any){
  console.log(e.target.id);
 }

drop2_con:boolean =false;  
drop1_con:boolean =false;
//arrow_pic:boolean = false;

navClick(e:any){
   console.log(e?.target.className);
   let t:string = "#" +e?.target.id; 
   var a = document.querySelector(t);
   
   a?.parentElement?.classList.add("pink");



   if(a?.id == "nav2")
     this.drop2_con =true;
   if(a?.id == "nav1"){
     this.drop1_con =true;
   }
  
   
 }

 outClick(e:any){
   var a = document.querySelector("#nav2");
   var b = document.querySelector("#nav1");
   //console.log(e.target)   \\
   
   
   var arrow_pic = document.querySelector("#arrow_pic")
   var items_selected = document.querySelector("#drop2_wrap");
   
   if(!a?.isEqualNode(e.target)){
     if( !arrow_pic?.contains(e.target) && ! items_selected?.contains(e.target)   ){
        // console.log("in");
         a!.parentElement!.classList.remove("pink");
         this.drop2_con =false;   
     }

   }
   if(! (b?.isEqualNode(e.target)) ){
      
     b!.parentElement!.classList.remove("pink");
   }

   //this.arrow_pic =false;


 }


food_stored:food[] =[];
sum_intake:total_intake = new total_intake(); 
new_item:number =0;
new_item_hid = true;
 yo(e:food){
  this.sum_intake.addCalories(e.calories);
  this.sum_intake.addCarb(e.carb);
  this.sum_intake.addFat(e.fat);
  this.sum_intake.addMineral(e.mineral);
  this.sum_intake.addProtein(e.protein);
  this.new_item +=1 ;
  this.new_item_hid = false;

  var t = this.food_stored.find( (r)=>{
      if(e.name ==r.name ){
        return true;
      } 
  }
  );
  if(t){
    
   // var identify= document.querySelector("#drop2_wrap_"+this.day_id+" "+"#selected_"+t.nameParse()+" #quantity"+this.day_id);
    var identify= document.querySelector("#selected_"+t.nameParse()+" #quantity");

    console.log(identify);
    var val = parseFloat(identify.innerHTML)+1;
    identify.innerHTML = val.toString();

   
    //var calo_id = document.querySelector("#drop2_wrap_"+this.day_id+" "+"#selected_"+t.nameParse()+" #calories"+this.day_id)
    var calo_id = document.querySelector("#selected_"+t.nameParse()+" #calories");

    var calo_amount = e.calories*val
    calo_id.innerHTML = calo_amount.toString(); 
    return;
  }

  //let new_food:food = new food(e.name,e.calories,e.carb,e.fat,e.protein,e.mineral,e.pic);
  this.food_stored.push(e);
  
} 

vis_badge(){
  
  if(this.display_arrow == false){
    this.new_item =0 ;
    this.new_item_hid = true;
  }
}


yo2(e:any,f:food){
 var quantity = e.target.parentElement.children[1];
 var a;
 if(e.target.innerHTML =="+"){
    a = parseFloat(quantity!.innerHTML)+1;
    this.sum_intake.addCalories(f.calories);
  this.sum_intake.addCarb(f.carb);
  this.sum_intake.addFat(f.fat);
  this.sum_intake.addMineral(f.mineral);
  this.sum_intake.addProtein(f.protein);  
  
 }
 else{
    a = parseFloat(quantity!.innerHTML)-1;
  this.sum_intake.addCalories(-1*f.calories);
  this.sum_intake.addCarb(-1*f.carb);
  this.sum_intake.addFat(-1*f.fat);
  this.sum_intake.addMineral(-1*f.mineral);
  this.sum_intake.addProtein(-1*f.protein);
   
 }
 quantity!.innerHTML = a.toString();
 //var calo_id = document.querySelector("#drop2_wrap_"+this.day_id+" "+"#selected_"+f.nameParse()+" #calories"+this.day_id);
  var calo_id = document.querySelector("#selected_"+f.nameParse()+" #calories");

 console.log("calo id ",calo_id);
 var calo_amount = f.calories*a
 calo_id.innerHTML = calo_amount.toString(); 
 
 if(a ==0){
   
   this.food_stored = this.food_stored.filter( (e)=>{
      if(e.name!=f.name ){return true}

   })
 }

}
//---------------

pop_food_stored(foods:food[]){
  while(foods.length=0){
      foods.pop();
  }
}

dayPack:Map<string,dbfood[]> = new Map<string,dbfood[]>();
prev_day_id ="8-21";



store_release(day_id:string){
  
  //console.log(this.prev_day_id);
  //console.log("before drop2",document.querySelector("#drop2_wrap"));
  let selected_foods:dbfood[] = [];     
   console.log("---") ;
  for(let food of this.food_stored){
      let selected_food:dbfood = new dbfood();
      
      selected_food.food = food;
   
      //let amount= document.querySelector("#drop2_wrap_"+this.day_id+" "+"#selected_"+food.nameParse()+" #quantity"+this.day_id);
      let amount= document.querySelector("#selected_"+food.nameParse()+" #quantity");

      //console.log("pass2");
      //console.log(food.nameParse()," ",amount);
      selected_food.amount = parseFloat(amount.innerHTML);
      selected_foods.push(selected_food)
    
  }       
  console.log("---") ;
  this.dayPack.set(this.prev_day_id,selected_foods); 
  this.prev_day_id =day_id;


  this.pop_food_stored(this.food_stored);
 ;
  
  this.sum_intake = new total_intake();

  if(this.dayPack.get(day_id)){
    //console.log(this.dayPack.get(day_id));
      for(let dbf of this.dayPack.get(day_id) ){
          
          this.food_stored.push(dbf.food)

      }
      setTimeout(e =>{
      for(let dbf of this.dayPack.get(day_id)){
          //console.log("og",dbf);
          //let amount= document.querySelector("#drop2_wrap_"+this.day_id+" "+"#selected_" + dbf.food.nameParse()+" #quantity"+this.day_id);
          //let calo_id = document.querySelector("#drop2_wrap_"+this.day_id+" "+"#selected_"+dbf.food.nameParse()+" #calories"+this.day_id);
         let amount= document.querySelector("#selected_"+ dbf.food.nameParse()+" #quantity");
         let calo_id = document.querySelector("#selected_"+dbf.food.nameParse()+" #calories");

          
          
          amount.innerHTML = dbf.amount.toString();
          let calo_amount =  dbf.food.calories * dbf.amount;
          calo_id.innerHTML = calo_amount.toString();



          this.sum_intake.addCalories(dbf.amount *  dbf.food.calories); 
          this.sum_intake.addProtein(dbf.amount *  dbf.food.protein);
          this.sum_intake.addCarb(dbf.amount *  dbf.food.carb) ;
          this.sum_intake.addFat(dbf.amount * dbf.food.fat );
          this.sum_intake.addMineral(dbf.amount * dbf.food.mineral );

      }
    },1000)
  }




}

hide_total(e:any){
  let height:string = e.offsetHeight;
  
  e.classList.remove("out3");
  
  this.rd.setStyle(e,"height",height+"px");
  e.classList.add("hid3");

}
out_total(e:any){

  
  e.classList.remove("hid3");
 
  e.classList.add("out3");

}













 
 

}













/*

let big_selected = document.querySelector("#drop2_wrap");
let food_selected = this.rd.createElement("div");
 let identify_id = "#drop2_wrap #selected_"+e.nameParse();
 let identify_selected = document.querySelector(identify_id);

 food_selected.insertAdjacentHTML("beforeend",`  
 <ion-item>   
 <div style="display:flex; position:relative; justify-content:center; text-align:center ;flex-direction:column; padding-top:20px; width:100%; border:1px solid red" > 
    <div><img style="height:100px;width:90%"></div>
    <div> </div> 
 
    <div>
      <div>dsd</div>
      <div style="font-size:9px">&nbsp;gcal</div>
    </div>

    <div>

    <button style="font-size:13px;margin-right:10px" >-</button>
    <div id="quantity" style="display:inline-block">1</div>
    <button  style="font-size:13px;margin-left:10px">+</button>
    
    </div>
</div>
 </ion-item>
 
`); 


if(identify_selected ==null){
  //food_selected.setAttribute("style","display:flex;position:relative;justify-content:center;flex-direction:column;padding-top:20px");
  food_selected.id = "selected_"+e.nameParse();
  
  this.rd.appendChild(big_selected,food_selected);  
  food_selected= document.querySelector(identify_id).firstElementChild.firstElementChild;
 
  var pic_item =food_selected.children[0].firstChild;
  pic_item.src = e.pic;
  
  var name_item = food_selected.children[1];
  var calo_item = food_selected.children[2].children[0]; 
  var quantity_item = food_selected.children[3].children[1]; 
  name_item.innerHTML += e.name;
  calo_item.innerHTML = e.calories;
  console.log(food_selected);



  food_selected.children[3].firstElementChild.addEventListener("mousedown",(r:any) =>{   
      this.yo2(r);
      
      
      let new_calo = e.calories * parseFloat(quantity_item.innerHTML); 
      
      calo_item.innerHTML = new_calo.toString(); 
      if(parseFloat(calo_item.innerHTML) ==0){
          this.rd.removeChild(big_selected,food_selected);
      }
    
  })
  food_selected.children[3].children[2].addEventListener("mousedown",(r:any) =>{   
        
    this.yo2(r);
    var new_calo = e.calories * parseFloat(quantity_item.innerHTML); 
    
    calo_item.innerHTML = new_calo.toString(); 
    
  })


}
else{

let quantity = document.querySelector("#drop2_wrap #selected_"+e.nameParse()+" #quantity"); 
var a = parseFloat(quantity!.innerHTML)+1;
quantity!.innerHTML = a.toString();

}  */