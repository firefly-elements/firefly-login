import FireflyLoginProviderItem from './firefly-login-provider-item.js';
import './firefly-login-icons.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
<script type="module">
/**
 * `firefly-facebook-login-item` A login item which uses the facebook auth plugin.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {FireflyLoginProviderItem}
 */
class FireflyFacebookLoginItem extends FireflyLoginProviderItem {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'firefly-facebook-login-item';
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.label = 'Facebook';
    this.icon = 'login:facebook';
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
      firstName: firebaseUser.first_name,
      lastName: firebaseUser.last_name,
      email: firebaseUser.email,
      avatar: firebaseUser.picture.data.url
    };
    this.dispatchEvent(
      new CustomEvent('show-create-account-dialog', {
        bubbles: true,
        composed: true,
        detail: {
          user: user,
          provider: 'facebook',
          uid: response.user.uid
        }
      })
    );
  }
}

window.customElements.define(
  FireflyFacebookLoginItem.is,
  FireflyFacebookLoginItem
);
