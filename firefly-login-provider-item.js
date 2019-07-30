import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/iron-icon/iron-icon.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
/**
 * `firefly-login-provider-item` This base class provides the methods and properties
 * needed to support login providers.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
export default class FireflyLoginProviderItem extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        paper-icon-item {
          --paper-item-icon: {
            margin-right: -20px;
          }
        }

        iron-icon {
          --iron-icon-height: 20px;
          --iron-icon-width: 20px;
          color: var(--app-header-color);
        }
      </style>

      <paper-icon-item>
        <iron-icon icon="[[icon]]" slot="item-icon"></iron-icon>
        <label>[[label]]</label>
      </paper-icon-item>
    `;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-login-provider-item';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      /** The ID of the item is the auth provider. i.e. 'google', 'facebook', etc */
      id: {
        type: String,
        value: ''
      },

      /** The text of the label to be displayed. */
      label: {
        type: String,
        value: ''
      },

      /** The icon to be displayed. */
      icon: {
        type: String,
        value: ''
      },

    };
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

  /**
   * Implementations of this method must handle start the signin process.
   * @param {FirebaseAuth} auth the firebase authorization element
   * @param {Boolean} createAccount a flag that indicates whether or not an account should be created
   */
  handleLogin(auth, createAccount) {
    auth
      .signInWithPopup(this.id)
      .then(response => {
        if (createAccount) {
          this.createAccount(response);
        }
      })
      .catch(msg => {
        console.error(msg);
        this.dispatchEvent(
          new CustomEvent('show-msg', {
            bubbles: true,
            composed: true,
            detail: {
              msg: msg.message
            }
          })
        );
      });
  }



  /**
   * This method is responsible for creating an account
   * @param {Object} response the response object from the authorization attempt.
   */
  createAccount(response) {}
}

window.customElements.define(
  FireflyLoginProviderItem.is,
  FireflyLoginProviderItem
);
