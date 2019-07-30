/**
 * This mixin defines the methods and properties needed for a login provider.
 * @polymerMixin
 * @mixinFunction
 */
export const FireflyLoginMixin = superclass =>
  class extends superclass {
    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
      return {
        /** The firebase auth object .*/
        auth: {
          type: Object
        },

        /** The ID of the selected provider. */
        selectedId: {
          type: String,
          value: ''
        },

        /** A flag that indicates that an account should be created. */
        createAccount: {
          type: Boolean,
          value: false
        }
      };
    }

    /**
     * This method tells the selected login provider item to execute it's handleLogin method.
     * @param {Event} e the event object.
     */
    handleLogin(e) {}
  };
