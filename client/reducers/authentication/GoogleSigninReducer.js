import {
  GOOGLE_SIGNIN_USER
} from '../../helpers/Constants';
import {
  getUserType,
  getAccountType
} from '../../helpers/TypeSync';

const initialState = [{
  token: '',
  username: '',
  email: '',
  usertype: '',
  accounttype: '',
}];

/**
 * GoogleSigninReducer
 *
 * @export GoogleSigninReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GoogleSigninReducer = (state = initialState, action) => {
  switch (action.type) {
  case GOOGLE_SIGNIN_USER:
    return [{
      token: action.payload.token,
      username: action.payload.username,
      email: action.payload.email,
      usertype: getUserType(action.payload.usertype),
      accounttype: getAccountType(action.payload.accounttype)
    }, ...state];
  default:
    return state;
  }
};

export default GoogleSigninReducer;
