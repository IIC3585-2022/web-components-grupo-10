import { LitElement, html, css } from 'lit-element'; 

const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
  };

class SellItemView extends LitElement { 

    static get properties() { 
    return {
        src: { type: String },
        name: { type: String },
        filter: { type: String },
        price: { type: Number },
        sale: { type: Number },
        rating: {type: Number},
    };
    }
    
    constructor() { 
    super();
    this.src = "";
    this.name = "";
    this.filter = VisibilityFilters.SHOW_ALL;
    this.price = 0;
    this.sale = 0;
    this.rating = 0;
    }


static get styles() {
    return css`
    .sell-item {
      font-family: Verdana;
      background: #eeeeee;
      width: 300px;
      height:500px;
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
    `
  }



  render() {


   
    return html`
      <div class="sell-item">
      <section>_</section>
        <section>
      
          <img src=${this.src}/>
          <h3>${this.name}</h3>
          ${this.sale>0? html`<h4>Oferta: $${this.sale}</h4>
          <h6>Precio normal: $${this.price}   </h6>`: html`<h4>Precio: $${this.price}</h4>` }


          <h4>Rating: ${this.rating}</h4>

        </section>
      </div>
    `;
  }
}

customElements.define('sell_item-view', SellItemView);