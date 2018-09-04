import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity,Alert,Platform,Image,Button,ActivityIndicator} from 'react-native';

import firebase from 'react-native-firebase'
const imageUrl =
  'https://www.shareicon.net/data/512x512/2016/07/19/798524_sms_512x512.png';

export default class LoginWithNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      codeInput: '',
      phoneNumber: '+91',
      auto: Platform.OS === 'android',
      autoVerifyCountDown: 0,
      sent: false,
      started: false,
      user: null,
    };
    this.timeout = 20;
    this._autoVerifyInterval = null;
  }
  _tick() {
    this.setState({
      autoVerifyCountDown: this.state.autoVerifyCountDown - 1,
    });
  }
  afterVerify = () => {
    const { codeInput, verificationId } = this.state;
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      codeInput
    );

    // TODO do something with credential for example:
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        console.log('PHONE AUTH USER ->>>>>', user.toJSON());
        this.setState({ user: user.toJSON() });
      })
      .catch(console.error);
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState(
      {
        error: '',
        started: true,
        autoVerifyCountDown: this.timeout,
      },
      () => {
        firebase
          .auth()
          .verifyPhoneNumber(phoneNumber)
          .on('state_changed', phoneAuthSnapshot => {
            console.log(phoneAuthSnapshot);
            switch (phoneAuthSnapshot.state) {
              case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                // update state with code sent and if android start a interval timer
                // for auto verify - to provide visual feedback
                this.setState(
                  {
                    sent: true,
                    verificationId: phoneAuthSnapshot.verificationId,
                    autoVerifyCountDown: this.timeout,
                  },
                  () => {
                    if (this.state.auto) {
                      this._autoVerifyInterval = setInterval(
                        this._tick.bind(this),
                        1000
                      );
                    }
                  }
                );
                break;
              case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                // restart the phone flow again on error
                clearInterval(this._autoVerifyInterval);
                this.setState({
                  ...this.state,
                  error: phoneAuthSnapshot.error.message,
                });
                break;

              // ---------------------
              // ANDROID ONLY EVENTS
              // ---------------------
              case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                clearInterval(this._autoVerifyInterval);
                this.setState({
                  sent: true,
                  auto: false,
                  verificationId: phoneAuthSnapshot.verificationId,
                });
                break;
              case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                clearInterval(this._autoVerifyInterval);
                this.setState({
                  sent: true,
                  codeInput: phoneAuthSnapshot.code,
                  verificationId: phoneAuthSnapshot.verificationId,
                });
                break;
              default:
              // will never get here - just for linting
            }
          });
      }
    );
  };

  renderInputPhoneNumber() {
    const { phoneNumber } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder="Phone number ... "
          value={phoneNumber}
          keyboardType = 'phone-pad'
        />
        <Button
          title="Begin Verification"
          color="green"
          onPress={this.signIn}
        />
      </View>
    );
  }

  renderSendingCode() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ paddingBottom: 15 }}>
        <Text style={{ paddingBottom: 25 }}>
          {`Sending verification code to '${phoneNumber}'.`}
        </Text>
        <ActivityIndicator animating style={{ padding: 50 }} size="large" />
      </View>
    );
  }

  renderAutoVerifyProgress() {
    const {
      autoVerifyCountDown,
      started,
      error,
      sent,
      phoneNumber,
    } = this.state;
    if (!sent && started && !error.length) {
      return this.renderSendingCode();
    }
    return (
      <View style={{ padding: 0 }}>
        <Text style={{ paddingBottom: 25 }}>
          {`Verification code has been successfully sent to '${phoneNumber}'.`}
        </Text>
        <Text style={{ marginBottom: 25 }}>
          {`We'll now attempt to automatically verify the code for you. This will timeout in ${autoVerifyCountDown} seconds.`}
        </Text>
        <Button
          style={{ paddingTop: 25 }}
          title="I have a code already"
          color="green"
          onPress={() => this.setState({ auto: false })}
        />
      </View>
    );
  }

  renderError() {
    const { error } = this.state;

    return (
      <View
        style={{
          padding: 10,
          borderRadius: 5,
          margin: 10,
          backgroundColor: 'rgb(255,0,0)',
        }}
      >
        <Text style={{ color: '#fff' }}>{error}</Text>
      </View>
    );
  }


  render() {
    const { started, error, codeInput, sent, auto, user } = this.state;
    return (
      <View
        style={{ flex: 1, backgroundColor: user ? 'rgb(0, 200, 0)' : '#fff' }}
      >
        <View
          style={{
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: 128,
              height: 128,
              marginTop: 25,
              marginBottom: 15,
            }}
          />
          <Text style={{ fontSize: 25, marginBottom: 20 }}>
            Phone Auth Example
          </Text>
          {error && error.length ? this.renderError() : null}
          {!started && !sent ? this.renderInputPhoneNumber() : null}
          {started && auto && !codeInput.length
            ? this.renderAutoVerifyProgress()
            : null}
          {!user && started && sent && (codeInput.length || !auto) ? (
            <View style={{ marginTop: 15 }}>
              <Text>Enter verification code below:</Text>
              <TextInput
                autoFocus
                style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                onChangeText={value => this.setState({ codeInput: value })}
                placeholder="Code ... "
                value={codeInput}
              />
              <Button
                title="Confirm Code"
                color="#841584"
                onPress={this.afterVerify}
              />
            </View>
          ) : null}
          {user ? (
            <View style={{ marginTop: 15 }}>
              <Text>{`Signed in with new user id: '${user.uid}'`}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

