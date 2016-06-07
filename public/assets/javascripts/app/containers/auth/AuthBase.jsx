import React, { Component, PropTypes } from 'react';

import Loading from '../../components/Loading';

class AuthBase extends Component {
  renderSubmit() {
    if (this.props.auth.isFetching) {
      const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px'
      };

      return (
        <div style={styles}>
          <Loading />
        </div>
      );
    }

    return <input className="p-auth__submit u-hover" type="submit" value="Send" />;
  }
}

AuthBase.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default AuthBase;
