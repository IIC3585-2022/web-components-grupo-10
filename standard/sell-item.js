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
      <p>Precio:<slot name="precio-normal"></p>
      <p>Oferta:<slot name="precio-oferta"></p>
      <h3 id="rating"></h3>

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
    this.shadowRoot.querySelector('#rating').innerText = this.getAttribute('rating');   


 } 
// component attributes
 connectedCallback(){
   this.name = this.getAttribute("name")
   this.rating = this.getAttribute("rating")

   this.render();
 }

 render(){
   this.h3;

 }
}
window.customElements.define('sell-item', SellItem);