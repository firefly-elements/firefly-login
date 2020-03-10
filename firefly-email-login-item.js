import FireflyLoginProviderItem from "./firefly-login-provider-item.js";
import "./firefly-login-icons.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

/**
 * `firefly-email-login-item` This component allows the user to log into the system using email & password authentication.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {FireflyLoginProviderItem}
 */
class FireflyEmailLoginItem extends FireflyLoginProviderItem {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return "firefly-email-login-item";
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();

    this.label = "Email & Password";
    this.icon = "login:email";
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
    this.dispatchEvent(
      new CustomEvent("show-email-login-dialog", {
        bubbles: true,
        composed: true,
        detail: {
          auth: auth,
          createAccount: createAccount
        }
      })
    );
  }

  /** @Override */
  createAccount(response) {
    let firebaseUser = response.additionalUserInfo.profile;
    let user = {
      firstName: firebaseUser.given_name,
      lastName: firebaseUser.family_name,
      email: firebaseUser.email,
      avatar: firebaseUser.picture
    };
    this.dispatchEvent(
      new CustomEvent("show-create-account-dialog", {
        bubbles: true,
        composed: true,
        detail: {
          user: user,
          provider: "email",
          uid: firebaseUser.uid
        }
      })
    );
  }
}

window.customElements.define(FireflyEmailLoginItem.is, FireflyEmailLoginItem);
