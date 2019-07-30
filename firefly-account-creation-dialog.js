import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-text-field';

import { AspenDialogMixin } from '@aspen-elements/aspen-dialog-mixin';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * `firefly-account-creation-dialog` This dialog displays the account creation information.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class FireflyAccountCreationDialog extends AspenDialogMixin(PolymerElement) {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-account-creation-dialog';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        h2 {
          font-size: 1.2em;
          color: var(--app-header-color);
        }
        #content-panel {
          @apply --layout-vertical;
          overflow-y: scroll;
        }

        paper-dialog {
          border: 1px solid white;
          border-radius: 5px;
          width: fit-content;
          padding: 5px;
          @apply --layout-vertical;
        }
      </style>

      <paper-dialog modal>
        <h2>Create Account</h2>
        <div id="content-panel">
          <vaadin-text-field
            label="First Name"
            value="{{model.firstName}}"
            required
            autofocus
            error-message="Please enter your first name"
          ></vaadin-text-field>
          <vaadin-text-field
            label="Last Name"
            value="{{model.lastName}}"
            required
            error-message="Please enter your last name"
          ></vaadin-text-field>
          <vaadin-text-field
            label="Title"
            value="{{model.title}}"
            required
            error-message="Please enter your title"
          ></vaadin-text-field>
          <vaadin-text-field
            label="Company"
            value="{{model.company}}"
            required
            error-message="Please enter the name of your company"
          ></vaadin-text-field>
          <vaadin-text-field
            label="Email"
            value="{{model.email}}"
            required
            error-message="Please enter your Email address"
          ></vaadin-text-field>
          <vaadin-text-field
            label="Twitter"
            value="{{model.twitter}}"
            placeholder="@MyTwitterHandle"
            required
            autofocus
            error-message="Please enter your Twitter handle"
          ></vaadin-text-field>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button autofocus on-tap="__createAccount">Accept</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  static get properties() {
    return {
      /** The UID of the user. */
      uid: {
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

  show(e) {
    this.model = e.detail.user;

    let dialog = this.shadowRoot.querySelector('paper-dialog');
    dialog.open();
  }

  /**
   * This method triggers an event used to create the user's account.
   */
  __createAccount(e) {
    let invalid = false;
    let fldArray = this.shadowRoot.querySelectorAll('vaadin-text-field');
    for (let fld of fldArray) {
      if (!fld.validate()) {
        invalid = true;
        break;
      }
    }
    if (!invalid) {
      let dialog = this.shadowRoot.querySelector('paper-dialog');
      dialog.close();

      this.model.inDemoMode = true;

      this.dispatchEvent(
        new CustomEvent('create-account', {
          bubbles: true,
          composed: true,
          detail: {
            user: this.model,
            uid: this.uid
          }
        })
      );
    }
  }
}

window.customElements.define(
  FireflyAccountCreationDialog.is,
  FireflyAccountCreationDialog
);
