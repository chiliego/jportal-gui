/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        :root {
          --primary-color: #4285f4;
        }
        a, paper-button {
          font-weight: bold;
        }
        a {
          color: var(--primary-color);
        }
        paper-button {
          color: #fff;
        }
        paper-button.primary {
          background: var(--primary-color);
        }
        blockquote {
          border-left: 4px solid #eee;
          margin-left: 4px;
          padding-left: 20px;
        }
      </style>
        
       <iron-ajax
            id="getQuoteAjax"
            auto
            url="http://localhost:8291/jportal/rsc/facets/label/3c3b8448f8824429a009645dc3fe9bb1"
            method="get"
            handle-as="text"
            last-response="{{quote}}">
       </iron-ajax>

      <div class="card">
      <h1>Quotes</h1>
        <blockquote>[[quote]]</blockquote>
        <paper-button raised on-tap="getQuote" class="primary">Get a New Quote</paper-button>
      </div>
    `;
  }

  static get is() {
    return 'home-quotes';
  }

  getQuote() {
    this.$.getQuoteAjax.generateRequest();
  }
}

window.customElements.define('home-quotes', MyView1);
