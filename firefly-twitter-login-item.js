import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import FireflyLoginProviderItem from "./firefly-login-provider-item";
import "./firefly-login-icons";

/**
 * `firefly-twitter-login-item` This component allows the user to log into the system using Twitter authentication.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {FireflyLoginProviderItem}
 */
class FireflyTwitterLoginItem extends FireflyLoginProviderItem {
  static get properties() {
    return {};
  }

  static get template() {
    return html``;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();

    this.label = "Twitter";
    this.icon = "login:twitter";
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }

  /** @Override */
  createAccount(response) {
    console.log(response);
    let firebaseUser = response.additionalUserInfo.profile;
    let user = {
      firstName: firebaseUser.given_name,
      lastName: firebaseUser.name,
      email: firebaseUser.email,
      twitter: "@" + firebaseUser.screen_name,
      avatar: firebaseUser.profile_image_url_https || "",
      summary: firebaseUser.description || ""
    };
    this.dispatchEvent(
      new CustomEvent("show-create-account-dialog", {
        bubbles: true,
        composed: true,
        detail: {
          user: user,
          provider: "twitter",
          uid: response.user.uid
        }
      })
    );
  }
}

customElements.define("firefly-twitter-login-item", FireflyTwitterLoginItem);
