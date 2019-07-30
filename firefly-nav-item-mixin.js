/**
 * This mixin contains the code and methods required for navigation items.
 * @polymerMixin
 * @mixinFunction
 */
export const FireflyNavItemMixin = superclass =>
  class extends superclass {
    static get properties() {
      return {
        /** The text of the label. */
        label: {
          type: String,
          value: ''
        },

        /** The name of the icon. */
        icon: {
          type: String,
          value: ''
        },

        /** The name of the page to be viewed. */
        page: {
          type: String,
          value: ''
        },

        /** Use this field, only if you are linking outside of the application. */
        href: {
          type: String,
          value: ''
        },

        /** A flag that indicates that the menu item is disabled. */
        disabled: {
          type: Boolean,
          value: false
        }
      };
    }

    /**
     * This method handles the navigation from the current page to the target page.
     * @param {Event} e the event object
     */
    _handleClick(e) {
      if (this.page) {
        window.location = '/' + this.page;
      } else {
        window.open(this.href);
      }
    }
  };
