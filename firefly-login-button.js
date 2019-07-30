import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/all-imports';
import '@polymer/iron-icon/iron-icon';
import './firefly-login-icons.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
/**
 * `firefly-login-button` This toggle button changes state whenever the user's login status changes.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class FireflyLoginButton extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background-color: crimson;
          --icon-margin-right: 5px;
          --icon-color: white;
          --icon-size: 24px;
        }

        iron-icon {
          margin-right: var(--icon-margin-right);
          color: var(--icon-color);
          --iron-icon-height: var(--icon-size);
          --iron-icon-width: var(--icon-size);
        }
      </style>

      <paper-item on-tap="__handleTap">
        <iron-icon icon="[[icon]]"></iron-icon>[[label]]
      </paper-item>
    `;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-login-button';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      isLoggedIn: {
        type: Boolean,
        value: false
      },

      icon: {
        type: String,
        computed: '__computeIcon(isLoggedIn)'
        // value: 'heart'
      },

      label: {
        type: String,
        computed: '__computeLabel(isLoggedIn)'
        // value: 'Test'
      }
    };
  }

  __computeIcon(isLoggedIn) {
    return isLoggedIn ? 'login:logout' : 'login:login';
  }

  __computeLabel(isLoggedIn) {
    return isLoggedIn ? 'Logout' : 'Login';
  }

  __handleTap(e) {
    alert('show dialog');
    if (this.isLoggedIn) {
      this.dispatchEvent(
        new CustomEvent('logout', {
          bubbles: true,
          composed: true,
          detail: {}
        })
      );
    } else {
      window.location = 'login.html';
    }
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
}

window.customElements.define(FireflyLoginButton.is, FireflyLoginButton);
