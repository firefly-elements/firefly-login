import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '@aspen-elements/aspen-button/aspen-button.js';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-toast/paper-toast.js';
import '@aspen-elements/aspen-nav-menu/aspen-nav-menu.js';
import '@firefly-elements/polymerfire/firebase-app.js';
import '@firefly-elements/polymerfire/firebase-auth.js';

import './../firefly-login-dialog';
import './../firefly-facebook-login-item';
import './../firefly-yahoo-login-item';
import './../firefly-google-login-item';
import './../firefly-email-login-item';
import './../firefly-login-provider-item';
import './../firefly-account-creation-dialog';
import './../firefly-email-login-dialog';


/**
 * @customElement
 * @polymer
 */
class AppTestApp extends PolymerElement {
  static get is() {
    return 'app-test';
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          --learn-more-row-width: 766px;
          --learn-more-button-width: 100px;
        }

        #splash[large-screen] {
          background-image: url('/images/barn2.jpg');
          background-size: cover;
        }
        #splash {
          background-image: url('/images/barn2-mobile.jpg');
          background-size: cover;
          height: 100vh;
          width: 100vw;
          overflow-y: scroll;
        }
        .button-row-set {
          background-color: rgba(255, 255, 255, 0.6);
          position: fixed;
          bottom: 0px;
          left: 256px;
          right: 0px;
          @apply --layout-horizontal;
          height: 80px;
        }
        .button-row-set[narrow] {
          position: fixed;
          left: 0px;
          width: 100vw;
        }

        .button-row {
          margin-top: auto;
          margin-bottom: auto;
          height: fit-content;
          width: fit-content;
        }
        .button-row[narrow] {
          margin-top: 20px;
          margin-bottom: 20px;

          height: 160px;
          width: fit-content;
        }

        .button-row[narrow] > paper-button {
          font-size: 0.8em;
          width: 130px;
        }

        .button-spacer {
          @apply --layout-flex;
        }

        aspen-nav-button {
          --icon-size: 40px;
          --icon-color: rgba(255, 255, 255, 0.8);

          width: 90px;
          margin-right: 10px;
          margin-top: 4px;
        }

        paper-button {
          background-color: crimson;
          color: white;
          height: 40px;
          width: 180px;
          font-family: 'Rubik';
        }

        paper-tabs {
          width: 100vw;
          background-color: transparent;
          color: #505050;
          position: fixed;
          bottom: 0px;
        }
        paper-tab {
          color: white;
          --paper-tab-content: {
            @apply --layout-vertical;
          }
        }
        paper-tab > label {
          color: #2f466f;
          font-size: 1.1em;
          font-weight: 500;
        }

        paper-tab > iron-icon {
          --iron-icon-width: 24px;
          --iron-icon-height: 24px;
        }

        .title {
          font-size: 3em;
          font-family: 'Rubik';
          color: white;
          font-weight: 100;
        }
        .subtitle {
          font-size: 1.5em;
          color: white;
          font-weight: 100;
        }
        .content {
          position: relative;
          top: 10vh;
          left: 10vw;
          margin-bottom: 160px;
          width: fit-content;
        }
        .panel-row {
          @apply --layout-horizontal;
          @apply --layout-wrap;
          margin-top: 40px;
          width: fit-content;
        }
        aspen-segment-panel {
          margin-bottom: 10px;
          background-color: rgba(0, 0, 100, 0.2);
        }

        aspen-segment-panel.middle {
          margin-right: 50px;
          margin-left: 50px;
        }

        #learnBtnRow {
          max-width: var(--learn-more-row-width);
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }
      </style>

      <firebase-auth id="auth" auth="{{auth}}" 
      app-name="husky" 
      user="{{firebaseUser}}" 
      signed-in="{{signedIn}}" 
      on-error="_handleAuthError" 
      provider="google,facebook,yahoo,email"></firebase-auth>


      <firefly-login-dialog>
        <firefly-google-login-item
          id="google"
          class="login-item"
        ></firefly-google-login-item>
        
        <firefly-facebook-login-item
          id="facebook"
          class="login-item"
        ></firefly-facebook-login-item>

      <firefly-yahoo-login-item
      id="yahoo"
      class="login-item">
      </firefly-yahoo-login-item>

        <firefly-email-login-item
          id="email"
          class="login-item"
        ></firefly-email-login-item>
      </firefly-login-dialog>

      <firefly-account-creation-dialog></firefly-account-creation-dialog>

      <firefly-email-login-dialog></firefly-email-login-dialog>

      <div class="button-row-set" narrow$="[[!largeScreen]]">
        <div class="button-spacer"></div>
        <div class="button-row" narrow$="[[!largeScreen]]">
          <paper-button raised on-click="__handleLogin">Login</paper-button>
          <paper-button raised on-click="__handleCreateAccount"
            >Create Account</paper-button
          >
        </div>
        <div class="button-spacer"></div>
      </div>

      <paper-toast id="toast"></paper-toast>
    
      <paper-progress
        value="{{item.bytesTransferred}}"
        min="0"
        max="{{item.totalBytes}}"
      >
      </paper-progress>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'app-test-app'
      }
    };
  }

  /**
   * This method shows the login dialog used by users who elect to login
   * using the email & password option.
   * @param {Event} e the event object
   */

  __showLoginDialog(e) {
    let dialog = this.shadowRoot.querySelector('firefly-login-dialog');
    dialog.auth = e.detail.auth;
    dialog.createAccount = e.detail.createAccount;
    dialog.newOpen();
  }

  /**
   * This method sends the 'login' event.
   * @param {Event} e the event object
   */

  __handleLogin(e) {
    console.log('show login dialog');
    this.dispatchEvent(
      new CustomEvent('show-login-dialog', {
        bubbles: true,
        composed: true,
        detail: {
          mode: 'login',
          createAccount: false,
          provider: e.detail.providers
        }
      })
    );
  }

  handleError(e) {
    console.error(e);
  }

  /**
   * This method displays the email/password login dialog dialog.
   * @param {Event} e the event object
   */

  __showEmailLoginDialog(e) {
    let dialog = this.shadowRoot.querySelector('firefly-email-login-dialog');
    dialog.auth = e.detail.auth;
    dialog.createAccount = e.detail.createAccount;
    dialog.newOpen();
  }

  /**
   * This method sends the 'create-account' event.
   * @param {Event} e the event object
   */

  __handleCreateAccount(e) {
    this.dispatchEvent(
      new CustomEvent('show-login-dialog', {
        bubbles: true,
        composed: true,
        detail: {
          mode: 'create-account',
          createAccount: true,
          provider: e.detail.provider
        }
      })
    );
  }

  /**
   * This method opens the account creation dialog.
   * @param {Event} e the event object
   */

  _showCreateAccountDialog(e) {
    let dialog = this.shadowRoot.querySelector(
      'firefly-account-creation-dialog'
    );
    dialog.createAccount = true;
    dialog.model = e.detail.user;
    dialog.uid = e.detail.uid;
    dialog.newOpen();
  }


  _showToast(e){
    this.$.toast.text = e.detail.msg;
    this.$.toast.open();
}

_handleAuthError(error){
  this._showToast({detail:{msg:"An error occurred while logging in"}});
  console.log(error);
}

_handleLogout(e){
  this.$.auth.signOut();
  console.log("Logged out");
}


  ready() {
    super.ready();

    let loginDialog = this.shadowRoot.querySelector('firefly-login-dialog');
    loginDialog.auth = this.shadowRoot.querySelector('firebase-auth');

    // Polymer.RenderStatus.afterNextRender(this, function() {});
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('show-msg', e => this._showToast(e));
    this.addEventListener('show-subscribe', e => this._showSubscribe(e));
    this.addEventListener('page-changed', e => this._pageChanged(e));
    this.addEventListener('show-create-account-dialog', e =>
      this._showCreateAccountDialog(e)
    );
    this.addEventListener('create-account', e => this.__handleCreateAccount(e));
    this.addEventListener('show-login-dialog', e => this.__showLoginDialog(e));
    this.addEventListener('show-email-login-dialog', e =>
      this.__showEmailLoginDialog(e)
    );
    this.addEventListener('login', e => this.__handleLogin(e));
    this.addEventListener('logout', e => this.__handleLogout(e));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('show-msg', e => this._showToast(e));
    this.removeEventListener('show-subscribe', e => this._showSubscribe(e));
    this.removeEventListener('page-changed', e => this._pageChanged(e));
    this.removeEventListener('show-create-account-dialog', e =>
      this._showCreateAccountDialog(e)
    );
    this.removeEventListener('create-account', e =>
      this.__handleCreateAccount(e)
    );
    this.removeEventListener('show-login-dialog', e =>
      this.__showLoginDialog(e)
    );
    this.removeEventListener('show-email-login-dialog', e =>
      this.__showEmailLoginDialog(e)
    );
    this.removeEventListener('login', e => this.__handleLogin(e));
    this.removeEventListener('logout', e => this.__handleLogout(e));
  }
}

window.customElements.define(AppTestApp.is, AppTestApp);
