/**
 *  @fileOverview Navigation component
 * - Shows the navigation bar and chooses what to display on the bar
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateFetch } from '../../helpers/Authentication';
import { getUserType } from '../../helpers/TypeSync';
import NavigationCard from './components/NavigationCard';
import { logoutUser } from '../../actions/Authentication';

/**
 * Navigation class
 *
 * @class Navigation
 * @extends {React.Component}
 */
class Navigation extends React.Component {
  /**
   * Creates an instance of Navigation.
   *
   * @param {any} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      userdata: {},
      toggleNav: true
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  /**
     * Component Will Mount
     *
     * @returns {void}
     * @memberof Navigation
     */
  componentWillMount() {
    const { userdata } = authenticateFetch();
    this.setState({
      userdata
    });
  }


  /**
   * Log out user function
   *
   * @returns {void}
   * @param {Object} event
   * @memberof PageBar
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logout(this.state.user);
  }

  /**
   * Toggles the navigation bar on smaller screens
   *
   * @param {Object} event
   * @memberof Navigation
   * @returns {void} toggles the navigation bar
   */
  handleNavToggle(event) {
    event.preventDefault();
    this.setState({
      toggleNav: !this.state.toggleNav
    });
  }

  /**
   * Render function
   *
   * @returns {Object} render object
   * @memberof Navigation
   */
  render() {
    return (
      <div>
        <nav className="navigation hide-on-med-and-up">
          <div className="container-fluid" onClick={this.handleNavToggle.bind(this)}>
            <div className="row">
              <div className="col s12">
                <div className="toggler" ><i className="material-icons">dehaze</i></div>
              </div>
            </div>
          </div>
        </nav>
        <nav id="main-nav" className={`navigation app-navigation ${this.state.toggleNav ? 'hide-on-small-only' : ''}`}>
          <div className="nav-wrapper container-fluid">
            <div className="row">
              <div className="col m1">

              </div>

              <div>
                {getUserType(this.state.userdata.usertype) === 'ADMIN' ?
                  (
                    <NavigationCard
                      name="dashboard"
                      title="Dashboard"
                      description="Application Dashboard"
                      link="/dashboard"
                    />
                  ) :
                  ''
                }
                <NavigationCard
                  name="books"
                  title="Books"
                  description="Collection of Books"
                  link="/books"
                />
                {getUserType(this.state.userdata.usertype) === 'ADMIN' ?
                  (
                    <NavigationCard
                      name="settings"
                      title="Settings"
                      description="Application Settings"
                      link="/settings"
                    />
                  ) :
                  (
                    <NavigationCard
                      name="history"
                      title="Borrowed Books"
                      description="Borrowed Books"
                      link="/borrowed"
                    />
                  )
                }
                <NavigationCard
                  name="profile"
                  title="Profile"
                  description="User's Profile Page"
                  link="/profile"
                />

                <div className="col m2 xs12 s12 nav-card" >
                  <div
                    name="logout-link"
                    className="card-link logout-link"
                    onClick={this.logoutUser}
                  >
                    <h4>Logout</h4>
                    <p>Leave the application</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>
    );
  }
}

/**
 * Map Dispatch To Props
 *
 * @param {Object} dispatch
 * @returns {Object} dispatch actions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

const mapStateToProps = () => {
  return null;
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
