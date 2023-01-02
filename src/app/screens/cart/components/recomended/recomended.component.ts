import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import SwiperCore, { Navigation,Pagination } from 'swiper';
import { Subscription } from 'rxjs';
SwiperCore.use([Navigation,Pagination]);
@Component({
  selector: 'app-recomended',
  templateUrl: './recomended.component.html',
  styleUrls: ['./recomended.component.scss']
})
export class RecomendedComponent implements OnInit {
  recomended:any[]=[]
  loading=false
  cart:any[]=[]
  tounsubscribe:Subscription
  swpieroptions: any = {
    slidesPerView: 3,
    spaceBetween: "50",
    pagination: false,
    navigation: "true",
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    }
  
  }
  constructor(public cartService:CartService) { }

  ngOnInit(): void {
    
    if(!!localStorage.getItem('drastitoken')) {
      this.cartService.getRecomnded().subscribe((res:any) =>  {
        this.recomended=res?.data?.materials
        if(Array.isArray(this.recomended)){
          this.recomended.map((item:any)=> {
            item.cart=false
          })
        } 
        this.getCart()
      })
    } else {
      this.getCart()
    }

  }
  pushCartIds(event:any) {
    if(event?.type=='subject') {
      if(!!localStorage.getItem('drastitoken')) {
        this.loading=true
          this.cartService.addToCart({
            material_ids:[event?.id],
            offer_ids:[],
          }).subscribe((res:any) => {
            this.cartService.getCart()
            this.loading=false
          },err =>{this.loading=false})
        } else {
          let cartItem = {
            has_material: true,
            material:this.recomended[this.recomended.findIndex(item=>item?.id==event?.id)]
          }
          this.cart.push(cartItem)
          this.cartService.cartItems.next(this.cart)
      }
    }
  }
  getCart() {
   this.tounsubscribe= this.cartService.cartItems.subscribe((res:any)=> {
      if(res) {
        this.cart= res
        if(!!localStorage.getItem('drastitoken')==false) {
          let materials = this.cart.filter(i=>i.has_material)
          console.log(materials)
          // here
        } 
        this.recomended.forEach((element:any) => {
          element.cart=false
            this.cart.forEach((cartItem:any) => {
              if(element?.id==cartItem?.material?.id) {
                element.cart=true
              }
            })
        });

      }
    })
 
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tounsubscribe.unsubscribe()
  }
}
