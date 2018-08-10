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
import '@polymer/iron-localstorage/iron-localstorage.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
// import { Auth0Lock } from 'auth0-lock';
import './shared-styles.js';

class MyView2 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .wrapper-btns {
    margin-top: 15px;
}
paper-button.link {
    color: #757575;
}
      </style>
      
      <iron-ajax
    id="registerLoginAjax"
    method="get"
    content-type="application/json"
    handle-as="text"
    on-response="handleUserResponse"
    on-error="handleUserError">
</iron-ajax>

      <div class="card">
        <div id="unauthenticated">
        <h1>Log In</h1>

    <p><strong>Log in</strong> or <strong>sign up</strong> to access secret Chuck Norris quotes!</p>
    
    

    <paper-input-container>
      <label slot="input">Username</label>
      <iron-input slot="input" bind-value="{{formData.username}}">
        <input id="username" type="text" value="{{formData.username}}" placeholder="Username">
      </iron-input>
    </paper-input-container>

    <paper-input-container>
      <label>Password</label>
      <iron-input slot="input" bind-value="{{formData.password}}">
        <input id="password" type="password" value="{{formData.password}}" placeholder="Password">
      </iron-input>
    </paper-input-container>

    <div class="wrapper-btns">
      <paper-button raised class="primary" on-tap="postLogin">Log In</paper-button>
      <paper-button class="link" on-tap="postRegister">Sign Up</paper-button>
    </div>
      </div>
    `;
  }

  static get properties() {
    return {
      formData: {
        type: Object,
        value: {}
      },
      userData: Object,
      error: String
    }
  }

  _setReqBody() {
    this.$.registerLoginAjax.body = this.formData;
  }

  postLogin() {
    this.getJSON('http://localhost:8291/jportal/api/v2/auth/login', req => {
      let userPasswToken = btoa([this.formData.username, this.formData.password].join(":"));
      req.setRequestHeader("Authorization", "Basic " + userPasswToken);
      req.setRequestHeader("Content-Type", "application/json");
    }).then(this.handleLoginResponse)
      .catch(error => console.log(error))
  }

  postRegister() {
    // this.$.registerLoginAjax.url = 'http://localhost:8291/jportal/api/v2/auth/logins';
    // this._setReqBody();
    // this.$.registerLoginAjax.generateRequest();
    console.log(this.formData);
  }

  handleLoginResponse(data){
    this.formData = {};
    // this.userData = data;
    console.log(data);
  }

  handleUserResponse(event) {
    var response = JSON.parse(event.detail.response);

    console.log(event)
    // if (response.id_token) {
    //   this.error = '';
    //   this.storedUser = {
    //     name: this.formData.username,
    //     id_token: response.id_token,
    //     access_token: response.access_token,
    //     loggedin: true
    //   };
    // }
    //
    // // reset form data
    // this.formData = {};
  }

  handleUserError(event) {
    this.error = event.detail.request.xhr.response;
  }

  getJSON(url, requestMod) {
    return new Promise((resolve, reject) => {
      let method = 'GET';
      let request = this.getCORSReq(method, url);
      if(request === null){
        reject({
          status: 500,
          status: "Browser does not support CORS!"
        })

        return;
      }

      request.onload = () => {
        if (request.status < 200 || request.status >= 300) {
          reject({
            status: request.status,
            statusText: request.statusText
          });
          return;
        }
        resolve(JSON.parse(request.responseText));
      };
      request.onerror = function () {
        reject({
          status: request.status,
          statusText: request.statusText
        });
      };

      // request.open('GET', url);
      if(requestMod !== null){
        requestMod(request);
      }
      // request.setRequestHeader("Authorization", "Basic YWRtaW5pc3RyYXRvcjphbGxlc3dpcmRndXQ=");
      // request.setRequestHeader("Content-Type", "application/json");
      request.send();
    });
  }

  getCORSReq(method, url){
    let request = new XMLHttpRequest();
    if ("withCredentials" in request) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      request.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      request = new XDomainRequest();
      request.open(method, url);

    }else {
      request = null;
    }

    return request;
  }
}

window.customElements.define('register-login', MyView2);
