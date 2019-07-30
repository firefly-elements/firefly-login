import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vadin-text-field';
import { AspenDialogMixin } from '@aspen-elements/aspen-dialog-mixin';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * `firefly-password-dialog` This dialog allows the user to change the password.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class FireflyPasswordDialog extends AspenDialogMixin(PolymerElement) {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-password-dialog';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        paper-button {
          background-color: var(--app-header-color);
          color: white;
          width: fit-content;
        }

        label {
          font-size: 0.9em;
          color: red;
        }
      </style>

      <paper-dialog>
        <h2>Change Password</h2>

        <vaadin-password-field
          label="Password"
          value="{{password}}"
          required
          autofocus
          type="password"
        >
        </vaadin-password-field>
        <label>[[msg]]</label>

        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button dialog-confirm autofocus on-tap="__changePassword"
            >Accept</paper-button
          >
        </div>
      </paper-dialog>
    `;
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      /** The firebase user object. */
      user: {
        type: Object,
        value: null
      },

      /** The new password. */
      password: {
        type: String,
        value: ''
      },

      /** The text of the error message. */
      msg: {
        type: String,
        value: ''
      }
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

  __changePassword() {
    let successMsg = '';
    this.user
      .updatePassword(this.password)
      .then(success => {
        successMsg = 'Password updated';
      })
      .catch(error => {
        if (error.code == 'auth/weak-password') {
          this.msg = 'The password is too weak.';
        }
      });

    if (successMsg) {
      this.dispatchEvent(
        new CustomEvent('show-msg', {
          bubbles: true,
          composed: true,
          detail: {
            msg: successMsg
          }
        })
      );
    }
  }
}

window.customElements.define(FireflyPasswordDialog.is, FireflyPasswordDialog);
