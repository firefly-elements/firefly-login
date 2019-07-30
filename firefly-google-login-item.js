import FireflyLoginProviderItem from './firefly-login-provider-item.js';
import './firefly-login-provider-item.js';
import './firefly-login-icons.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * `firefly-google-login-item` This component allows the user to log into the system using Google authentication.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {FireflyLoginProviderItem}
 */
class FireflyGoogleLoginItem extends FireflyLoginProviderItem {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-google-login-item';
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();

    this.label = 'Google';
    this.icon = 'login:google';
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function() {});
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
      new CustomEvent('show-create-account-dialog', {
        bubbles: true,
        composed: true,
        detail: {
          user: user,
          provider: 'google',
          uid: firebaseUser.uid
        }
      })
    );
  }
}

window.customElements.define(FireflyGoogleLoginItem.is, FireflyGoogleLoginItem);
