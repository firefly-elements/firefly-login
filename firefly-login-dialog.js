import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-selector/iron-selector.js';
import { AspenDialogMixin } from '@aspen-elements/aspen-dialog-mixin';
import '@firefly-elements/polymerfire/firebase-auth';
import { FireflyLoginMixin } from './firefly-login-mixin';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * `firefly-login-dialog` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class FireflyLoginDialog extends FireflyLoginMixin(
  AspenDialogMixin(PolymerElement)
) {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-login-dialog';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        h2 {
          color: var(--app-header-color);
          font-size: 1.2em;
        }

        paper-dialog {
          width: fit-content;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid white;
        }

        paper-dialog > p {
          font-size: 1em;
          color: #909090;
          margin-top: 0px;
          margin-bottom: 0px;
        }

        .items {
          padding-left: 20px;
        }
      </style>

      <firebase-auth app-name="pharm2market-admin"></firebase-auth>

      <paper-dialog>
        <h2>Login to Your custom App</h2>
        <p>Click one of the login methods shown below.</p>
        <div class="items">
          <iron-selector
            selected="{{selectedId}}"
            attr-for-selected="id"
            on-iron-select="handleLogin"
          >
            <slot slot="login-item"></slot>
          </iron-selector>
        </div>

        <div class="buttons">
          <paper-button raised dialog-dismiss>Cancel</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {};
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {});
  }

  init() {
    super.init();
    this.selectedId = '';
  }

  /** @Override */
  handleLogin(e) {
    this.auth = this.shadowRoot.querySelector('firebase-auth');

    let item = e.detail.item;
    item.handleLogin(this.auth, this.createAccount);

    let dialog = this.shadowRoot.querySelector('paper-dialog');
    dialog.close();
  }
}

window.customElements.define(FireflyLoginDialog.is, FireflyLoginDialog);
