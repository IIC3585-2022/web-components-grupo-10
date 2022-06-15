const template = document.createElement('template');
template.innerHTML = `
<style>
  .sell-item {
    font-family: Verdana;
    background: #eeeeee;
    width: 300px;
    height:400px;
    display: flex;
    flex-direction:column;
    align-items:center;
    margin-bottom: 50px;
    border-radius:10px;
    
  }
  img{
    margin-top:5px;
    height:200px !important;
    width:150px !important;
  }

  h3{
    color:blue
  }
  #percent-div{
    background-color:#ff4455;
    border-radius:50%;
    width:60px;
    text-align:center;
    color:white;
    margin-left:5px
  }
  .crossed{
    font-size:10px;
    text-decoration: line-through;
  }
  .sale-and-discount{
    display:flex;
    flex-direction:row;
  }
  #price-with-sale{
    color:"#444444"
  }
</style>

<div class="sell-item">
  <img/>
  <div>
    <h3 id="name"></h3>
    <div class="details">
      <div hidden id="price-with-sale">
        <div class ="sale-and-discount">
          <span id="sale"></span>
          <div id="percent-div">
            <span id="percent"></span>
          </div>
        </div>
        <span class="crossed" id="normal"></span>
        
      </div>
      <div id="price-no-sale">
        <p><span id="normal-normal"></span></p>
      </div>
      <p>Rating:<slot name="rating"></p>

    </div>
  </div>
</div>`;

class SellItem extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector('#name').innerText = this.getAttribute('name');   

    this.shadowRoot.querySelector('img').src = this.getAttribute('image');

    this.shadowRoot.querySelector('#normal').innerText = "Precio:" + this.getAttribute('normal');   
    this.shadowRoot.querySelector('#normal-normal').innerText = "Precio:" + this.getAttribute('normal');   


    this.priceNoSaleDiv = this.shadowRoot.querySelector("#price-no-sale");
    this.priceSaleDiv = this.shadowRoot.querySelector("#price-with-sale");

    if (this.getAttribute('sale')){
      this.shadowRoot.querySelector('#sale').innerText = "Oferta:" + this.getAttribute('sale');
      this.shadowRoot.querySelector('#percent').innerText = this.percentGet
      this.priceSaleDiv.hidden = false
      this.priceNoSaleDiv.hidden = true
    }
 } 
// component attributes
 connectedCallback(){
   this.$name = this.getAttribute("name")
   this.$normal = this.getAttribute("normal")
   this.$sale = this.getAttribute("sale")
   
   

   this.render();

 }

 get normal(){
    return this.getAttribute("normal")
 }

 get sale(){
  return this.getAttribute("sale")
}


 get percentGet(){
  if (this.sale){
    return "-" + ((1-parseInt(this.sale)/parseInt(this.normal))*100|0) + "%"
  }
 }

 render(){
  this.priceSaleDiv
  this.priceNoSaleDiv
  this.percent
 }
}
window.customElements.define('sell-item', SellItem);