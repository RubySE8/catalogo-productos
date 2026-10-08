(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://dummyjson.com/products`;async function t(){let t=await fetch(e);if(!t.ok)throw Error(`Error HTTP: ${t.status}`);return(await t.json()).products}var n=`favorite-product-ids`;function r(){let e=localStorage.getItem(n);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function i(e){return r().includes(e)}function a(e){let t=r(),i=t.indexOf(e);return i>=0?t.splice(i,1):t.push(e),localStorage.setItem(n,JSON.stringify(t)),t.includes(e)}function o(e){return`$${e.toFixed(2)}`}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}function c(e){return e===0?`Sin stock`:e<10?`Ultimas ${e} unidades`:`${e} disponibles`}function l(e){let t=document.createElement(`article`);t.className=`product-card`,e.stock===0&&t.classList.add(`unavailable`);let n=i(e.id),r=n?`product-card__favorite--active`:``,a=n?`♥`:`♡`;return t.innerHTML=`
  <button
    type="button"
    class="product-card__favorite ${r}"
    data-favorite-id="${e.id}"
    aria-label="Marcar como favorito"
  >
    ${a}
  </button>
  <img src="${e.thumbnail}" alt="${e.title}" class="product-card__image" />
  <div class="product-card__info">
    <h2 class="product-card__title">${e.title}</h2>
    <p class="product-card__category">${s(e.category)}</p>
    <p class="product-card__price">${o(e.price)}</p>
    <p class="product-card__stock">${c(e.stock)}</p>
  </div>
`,t}function u(e){let t=document.createElement(`div`);if(t.className=`catalog`,e.length===0){let e=document.createElement(`p`);return e.className=`catalog__empty`,e.textContent=`No se encontraron productos`,t.appendChild(e),t}let n=document.createDocumentFragment();return e.forEach(e=>{let t=l(e);n.appendChild(t)}),t.appendChild(n),t}function d(e){let t=document.createElement(`form`);return t.className=`request-form`,t.id=`request-form`,t.innerHTML=`
    <h2 class="request-form__title">Solicitar producto</h2>

    <div class="form-field">
      <label for="name" class="form-field__label">Nombre</label>
      <input
        type="text"
        id="name"
        name="name"
        class="form-field__input"
        placeholder="Tu nombre completo"
      />
      <span class="form-field__error" data-error-for="name"></span>
    </div>

    <div class="form-field">
      <label for="email" class="form-field__label">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        class="form-field__input"
        placeholder="tu@email.com"
      />
      <span class="form-field__error" data-error-for="email"></span>
    </div>

    <div class="form-field">
      <label for="product" class="form-field__label">Producto</label>
      <select id="product" name="product" class="form-field__input">
        <option value="">Selecciona un producto</option>
        ${e.map(e=>`<option value="${e.id}" ${e.stock===0?`disabled`:``}>${e.title} ${e.stock===0?`(sin stock)`:`(stock: ${e.stock})`}</option>`).join(``)}
      </select>
      <span class="form-field__error" data-error-for="product"></span>
    </div>

    <div class="form-field">
      <label for="quantity" class="form-field__label">Cantidad</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        class="form-field__input"
        min="1"
        placeholder="1"
      />
      <span class="form-field__error" data-error-for="quantity"></span>
    </div>

    <button type="submit" class="request-form__submit">
      Enviar solicitud
    </button>
  `,t}function f(e,t){let n=t.trim().toLowerCase();return n===``?e:e.filter(e=>e.title.toLowerCase().includes(n))}function p(e,t){return t===`all`?e:e.filter(e=>e.category===t)}function m(e,t){let n=[...e];switch(t){case`price-asc`:n.sort((e,t)=>e.price-t.price);break;case`price-desc`:n.sort((e,t)=>t.price-e.price);break;case`name-asc`:n.sort((e,t)=>e.title.localeCompare(t.title));break;case`stock-desc`:n.sort((e,t)=>t.stock-e.stock)}return n}function h(e){let t=e.filter(e=>e.stock>0),n=e.filter(e=>e.stock===0);return[...t,...n]}function g(e){let t=e.trim();return t===``?`El nombre es obligatorio`:t.length<3?`El nombre debe tener al menos 3 caracteres`:``}function _(e){let t=e.trim();return t===``?`El email es obligatorio`:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?``:`El email no tiene un formato válido`}function v(e){return e===``?`Debes seleccionar un producto`:``}function y(e,t){let n=e.trim();if(n===``)return`La cantidad es obligatoria`;let r=Number(n);return!Number.isInteger(r)||r<1?`La cantidad debe ser un número mayor o igual a 1`:r>t?`No puedes pedir más de ${t} unidades`:``}function b(e){let t=document.querySelector(`#request-form`),n=document.querySelector(`#name`),r=document.querySelector(`#email`),i=document.querySelector(`#product`),a=document.querySelector(`#quantity`);n.addEventListener(`input`,()=>{S(`name`,g(n.value))}),r.addEventListener(`input`,()=>{S(`email`,_(r.value))}),i.addEventListener(`change`,()=>{S(`product`,v(i.value)),x(e)}),a.addEventListener(`input`,()=>{x(e)}),t.addEventListener(`submit`,a=>{a.preventDefault();let o=g(n.value),s=_(r.value),c=v(i.value),l=x(e);S(`name`,o),S(`email`,s),S(`product`,c),o===``&&s===``&&c===``&&l===``&&C(t,n.value)})}function x(e){let t=document.querySelector(`#product`),n=document.querySelector(`#quantity`),r=Number(t.value),i=n.value;if(isNaN(r)||r===0)return S(`quantity`,``),``;let a=e.find(e=>e.id===r),o=y(i,a?a.stock:0);return S(`quantity`,o),o}function S(e,t){let n=document.querySelector(`[data-error-for="${e}"]`);n&&(n.textContent=t)}function C(e,t){let n=document.querySelector(`#product`).selectedOptions[0]?.textContent?.split(` (`)[0]??``;alert(`¡Solicitud enviada!\n\nGracias ${t}, tu pedido de "${n}" fue registrado.`),e.reset(),document.querySelectorAll(`.form-field__error`).forEach(e=>e.textContent=``)}function w(e,t){let n;return(...r)=>{clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}function T(e){document.querySelector(`#catalog`).addEventListener(`click`,t=>{let n=t.target;if(!n.classList.contains(`product-card__favorite`))return;let r=Number(n.dataset.favoriteId);r&&(a(r),e())})}var E={allProducts:[],search:``,category:`all`,sort:`default`},D=document.querySelector(`#app`);async function O(){D.innerHTML=`<p class="loading">Cargando productos...</p>`;try{E.allProducts=await t(),A(),k(),j(),T(()=>M()),M()}catch(e){D.innerHTML=`<p class="error">Error al cargar los productos: ${e.message}</p>`,console.error(e)}}function k(){let e=document.querySelector(`#form-container`),t=d(E.allProducts);e.innerHTML=``,e.appendChild(t),b(E.allProducts)}function A(){D.innerHTML=`
    <header class="app-header">
      <h1>Catálogo de Productos</h1>
      <div class="filters">
        <input
          type="search"
          id="search"
          class="search"
          placeholder="Buscar productos..."
        />
        <select id="category" class="category-select">
          <option value="all">Todas las categorías</option>
          ${P(E.allProducts).map(e=>`<option value="${e}">${s(e)}</option>`).join(``)}
        </select>
        <select id="sort" class="sort-select">
          <option value="default">Ordenar por...</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre: A a Z</option>
          <option value="stock-desc">Stock: mayor a menor</option>
        </select>
      </div>
    </header>
    <div id="catalog"></div>
    <div id="form-container"></div>
  `}function j(){let e=document.querySelector(`#search`),t=document.querySelector(`#category`),n=document.querySelector(`#sort`),r=w(e=>{E.search=e,M()},300);e.addEventListener(`input`,e=>{r(e.target.value)}),t.addEventListener(`change`,e=>{E.category=e.target.value,M()}),n.addEventListener(`change`,e=>{E.sort=e.target.value,M()})}function M(){let e=document.querySelector(`#catalog`),t=N(E);e.innerHTML=``,e.appendChild(u(t))}function N(e){let t=[...e.allProducts];return t=f(t,e.search),t=p(t,e.category),t=m(t,e.sort),t=h(t),t}function P(e){return[...new Set(e.map(e=>e.category))]}O();