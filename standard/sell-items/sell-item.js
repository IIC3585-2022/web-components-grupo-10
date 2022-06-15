const template = document.createElement('template');
template.innerHTML = `
<style>
  .sell-item {
    font-family: Verdana;
    background: #aaaaaa;
    width: 360px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 50px;
    
  }
  img{
    max-width:300px !important;
  }
  h3{color:blue}
</style>

<div class="sell-item">
  <img/>
  <div>
    <h3 id="name"></h3>
    <div class="details">
      <p><span id="normal"></span></p>
      <p><span id="sale"></span></p>
      <h3 id="rating"></h3>
      <h3 id="percent"></h3>
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
    
    if (this.getAttribute('sale')){
      this.shadowRoot.querySelector('#sale').innerText = "Oferta:" + this.getAttribute('sale');
      this.shadowRoot.querySelector('#percent').innerText = this.percentGet
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
    return "-"+((1-parseInt(this.sale)/parseInt(this.normal))*100|0)+"%"
  }
}

 render(){
  this.percent
 }
}
window.customElements.define('sell-item', SellItem);