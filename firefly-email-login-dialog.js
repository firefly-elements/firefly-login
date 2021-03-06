import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/paper-input/paper-input.js";
import "@vaadin/vaadin-text-field/vaadin-text-field";
import "@vaadin/vaadin-text-field/vaadin-password-field";
import "@polymer/iron-selector/iron-selector.js";
import { AspenDialogMixin } from "@aspen-elements/aspen-dialog-mixin";
import { FireflyLoginMixin } from "./firefly-login-mixin.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
/**
 * `firefly-email-login-dialog` This dialog displays a number of login provider options and
 * allows the user to select one of them.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class FireflyEmailLoginDialog extends FireflyLoginMixin(
  AspenDialogMixin(PolymerElement)
) {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return "firefly-email-login-dialog";
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
        paper-dialog > div {
          @apply --layout-vertical;
        }
        paper-button {
          background-color: var(--app-header-color);
          color: white;
          width: fit-content;
        }
        .forgot-password-link {
          margin: 7px 0;
          color: #4285f4;
          text-align: right;
          cursor: pointer;
          font-size: 12px;
        }
        .forgot-password-link:hover {
          color: #274f92;
        }
        .buttons {
          @apply --layout-horizontal;
        }
      </style>
      <paper-dialog modal>
        <h2>[[__label]]</h2>
        <div>
          <template is="dom-if" if="[[createAccount]]">
            <vaadin-text-field
              label="First Name"
              value="{{model.firstName}}"
              required
              autofocus
            >
            </vaadin-text-field>
            <vaadin-text-field
              label="Last Name"
              value="{{model.lastName}}"
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="Twitter ID"
              value="{{model.twitter}}"
            ></vaadin-text-field>
          </template>
          <vaadin-text-field
            label="Email Address"
            value="{{model.email}}"
            required
          ></vaadin-text-field>
          <vaadin-password-field
            label="Password"
            value="{{model.password}}"
            required
            type="password"
          >
          </vaadin-password-field>
          <template is="dom-if" if="[[!createAccount]]">
            <a class="forgot-password-link" on-click="__openEmailDialog"
              >Forgot Password?</a
            >
          </template>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button dialog-confirm autofocus on-tap="handleLogin"
            >Accept</paper-button
          >
        </div>
      </paper-dialog>
      <paper-dialog modal class="email-modal">
        <h2>Forgot Password</h2>
        <vaadin-text-field
          label="Email Address"
          value="{{passwordResetEmail}}"
          required
        ></vaadin-text-field>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button autofocus on-tap="__handleForgotPasswod"
            >Submit</paper-button
          >
        </div>
      </paper-dialog>
    `;
  }
  static get properties() {
    return {
      /** The label to be displayed in the dialog. */
      __label: {
        type: String,
        computed: "__computeLabel(createAccount)"
      },
      // the email for password rest
      passwordResetEmail: {
        type: String,
        value: ""
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
  /**
   * This method creates a different dialog label depending on whether or not the
   * user is creating an account.
   * @param {Boolean} createAccount a flag that determines if the user wants to create an account.
   */
  __computeLabel(createAccount) {
    return createAccount ? "Create an Account " : "Login To Your App";
  }
  /** @Override */
  handleLogin(e) {
    if (this.createAccount) {
      debugger;
      console.log("Got here");
      this.auth
        .createUserWithEmailAndPassword(this.model.email, this.model.password)
        .then(userCredential => {
          console.log("Credential");
          console.log(userCredential);
          let user = {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            twitter: this.model.twitter || "",
            inDemoMode: true,
            email: this.model.email
          };
          this.dispatchEvent(
            new CustomEvent("create-account", {
              bubbles: true,
              composed: true,
              detail: {
                uid: userCredential.uid,
                user: user
              }
            })
          );
        })
        .catch(error => {
          this.__handleError(error);
        });
    } else {
      this.auth
        .signInWithEmailAndPassword(this.model.email, this.model.password)
        .catch(error => {
          this.__handleError(error);
        });
    }
  }
  /**
   * This method is responsible for handling
   */
  __handleError(error) {
    let errorCode = error.code;
    let msg = "";
    if (errorCode == "auth/weak-password") {
      msg = "The password is too weak.";
    } else if (errorCode == "auth/email-already-in-use") {
      msg = "The email address is already in use";
    } else if (errorCode == "auth/invalid-email") {
      msg = "The email address is invalid";
    } else if (errorCode == "auth/weak-password") {
      msg = "The password is too weak";
    } else if (errorCode == "auth/wrong-password") {
      msg = "Attempted to login using the wrong password";
    } else if (errorCode == "auth/user-not-found") {
      msg = "There is no user record corresponding to this email address.";
    }
    if (msg) {
      this.dispatchEvent(
        new CustomEvent("show-msg", {
          bubbles: true,
          composed: true,
          detail: {
            msg: msg
          }
        })
      );
    }
  }
  /**
   * opens the email dialog for submitiing email for password reset
   */
  __openEmailDialog() {
    this.passwordResetEmail = "";
    this.shadowRoot.querySelector(".email-modal").open();
  }
  /**
   * This method is responsible for handling forgot password flow
   */
  __handleForgotPasswod() {
    this.auth
      .sendPasswordResetEmail(this.passwordResetEmail)
      .then(() => {
        this.dispatchEvent(
          new CustomEvent("show-msg", {
            bubbles: true,
            composed: true,
            detail: {
              msg: `A confirmation email has been sent to ${this.passwordResetEmail}.`
            }
          })
        );
        this.shadowRoot.querySelector(".email-modal").close();
      })
      .catch(error => {
        this.__handleError(error);
      });
  }
}
window.customElements.define(
  FireflyEmailLoginDialog.is,
  FireflyEmailLoginDialog
);
