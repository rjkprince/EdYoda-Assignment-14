import React, { Component } from 'react';
import classes from './Accounts.module.css';
import defaultAvatar from '../../Assets/default-avatar.jpg';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();

    this.state = {
      account: 'default',
      localData: {},
      avatar: defaultAvatar,
      name: '',
      email: '',
      password: '',
      re_password: '',
      phone: '',
      newImg: '',
      showTrash: false,
    };
  }
  fileUpload = () => {
    this.imgRef.current.click();
  };
  fileInputHandler = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load', () => {
      this.setState({
        newImg: reader.result,
      });
      let localData = this.state.localData;
      switch (this.state.account) {
        case 'Admin':
          localData['Admin']['newImg'] = reader.result;
          localData = JSON.stringify(localData);
          localStorage.setItem('accountsPage', localData);

          break;
        case 'Customer':
          localData['Customer']['newImg'] = reader.result;
          localData = JSON.stringify(localData);
          localStorage.setItem('accountsPage', localData);

          break;
        case 'Editor':
          localData['Editor']['newImg'] = reader.result;
          localData = JSON.stringify(localData);
          localStorage.setItem('accountsPage', localData);

          break;
        case 'Merchant':
          localData['Merchant']['newImg'] = reader.result;
          localData = JSON.stringify(localData);
          localStorage.setItem('accountsPage', localData);

          break;
        default:
          console.log('data not matched');
      }
    });

    e.target.value = '';
  };
  setAccount = (e) => {
    this.setState({
      account: e.target.value,
    });
    let data = this.state.localData;
    if (e.target.value === 'default') {
      this.setState({
        avatar: defaultAvatar,
        name: '',
        email: '',
        password: '',
        re_password: '',
        phone: '',
      });
    } else {
      data = data[e.target.value];
      this.setState({
        avatar: data['profilePic'],
        name: data['name'],
        email: data['email'],
        password: data['password'],
        re_password: '',
        phone: data['phone'],
        newImg: data['newImg'],
      });
    }
  };
  inputHandler = (e, type) => {
    switch (type) {
      case 'name':
        this.setState({
          name: e.target.value,
        });
        break;
      case 'email':
        this.setState({
          email: e.target.value,
        });
        break;
      case 'password':
        this.setState({
          password: e.target.value,
        });
        break;
      case 're_password':
        this.setState({
          re_password: e.target.value,
        });
        break;
      case 'phone':
        this.setState({
          phone: e.target.value,
        });
        break;
      default:
        console.log('type not matched for input');
    }
  };

  removeImageHandler = () => {
    if (this.state.account !== 'default') {
      let data = this.state.localData;
      data[this.state.account]['profilePic'] = null;
      data[this.state.account]['newImg'] = null;
      this.setState({
        avatar: null,
        newImg: null,
        localData: data,
      });
      localStorage.setItem('accountsPage', JSON.stringify(data));
    }
  };

  saveInputToLocal = () => {
    if (this.state.password === this.state.re_password) {
      let data = this.state.localData;
      data[this.state.account]['name'] = this.state.name;
      data[this.state.account]['email'] = this.state.email;
      data[this.state.account]['password'] = this.state.password;
      data[this.state.account]['re_password'] = this.state.re_password;
      data[this.state.account]['phone'] = this.state.phone;
      localStorage.setItem('accountsPage', JSON.stringify(data));
      alert('Profile Updated Successfully');
    } else {
      alert('password not matched');
    }
  };

  componentDidMount = () => {
    let Data = localStorage.getItem('accountsPage');
    Data = JSON.parse(Data);

    this.setState({
      localData: Data,
    });
  };

  render() {
    let Accounts = [];
    for (let keys in this.state.localData) {
      Accounts.push(keys);
    }

    return (
      <div className={classes.Accounts}>
        <div className={`${classes.ListAcc} ${classes.AccList}`}>
          <h1 className={classes.Title}>List of Accounts</h1>
          <p className={classes.Label}>Accounts</p>
          <select
            name='Account'
            id='account'
            className={classes.Account}
            onChange={(e) => this.setAccount(e)}
            value={this.state.account}
          >
            <option value='default'>Select Account</option>
            {Accounts.map((item, pos) => {
              return (
                <option key={pos} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes.SettingsWrap}>
          <div className={`${classes.ListAcc} ${classes.AvatarSec}`}>
            <h1 className={classes.Title}>Change Avatar</h1>
            <img
              src={
                this.state.account === 'default'
                  ? defaultAvatar
                  : this.state.newImg === undefined ||
                    this.state.newImg === null ||
                    this.state.newImg === 'unknown'
                  ? this.state.avatar === undefined ||
                    this.state.avatar === null ||
                    this.state.avatar === 'unknown'
                    ? defaultAvatar
                    : this.state.avatar
                  : this.state.newImg
              }
              alt='avatar'
              onMouseEnter={() => {
                this.setState({
                  showTrash: true,
                });
              }}
              onMouseLeave={() => {
                this.setState({
                  showTrash: false,
                });
              }}
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              className={`${classes.TrashIcon} ${
                this.state.showTrash ? classes.ShowTrash : null
              }`}
              onClick={this.removeImageHandler}
            />
            <input
              type='file'
              ref={this.imgRef}
              className={classes.InputImg}
              onInput={(e) => {
                this.fileInputHandler(e);
              }}
            />
            <button
              className={`${classes.Btn} ${
                this.state.account === 'default' ? classes.Disable : null
              }`}
              onClick={this.fileUpload}
            >
              UPLOAD NEW PHOTO
            </button>
          </div>
          <div className={`${classes.ListAcc} ${classes.SettingsSec}`}>
            <h1 className={classes.Title}>Accounts Settings</h1>
            <div className={classes.InputDivWrap}>
              <div className={classes.InputDiv}>
                <div>
                  <p className={classes.Label}>Account Name</p>
                  <input
                    type='text'
                    value={this.state.name}
                    onChange={(e) => this.inputHandler(e, 'name')}
                  />
                </div>
                <div>
                  <p className={classes.Label}>Account Email</p>
                  <input
                    type='email'
                    value={this.state.email}
                    onChange={(e) => this.inputHandler(e, 'email')}
                  />
                </div>
              </div>
              <div className={classes.InputDiv}>
                <div>
                  <p className={classes.Label}>Password</p>
                  <input
                    type='password'
                    value={this.state.password}
                    onChange={(e) => this.inputHandler(e, 'password')}
                  />
                </div>
                <div>
                  <p className={classes.Label}>Re-enter Password</p>
                  <input
                    type='password'
                    value={this.state.re_password}
                    onChange={(e) => this.inputHandler(e, 're_password')}
                  />
                </div>
              </div>
              <div className={classes.InputDiv}>
                <div>
                  <p className={classes.Label}>Phone</p>
                  <input
                    type='text'
                    value={this.state.phone}
                    onChange={(e) => this.inputHandler(e, 'phone')}
                  />
                </div>
                <div>
                  <button
                    className={`${classes.Btn} ${classes.UpdateBtn} ${
                      this.state.account === 'default' ? classes.Disable : null
                    }`}
                    onClick={this.saveInputToLocal}
                  >
                    UPDATE YOUR PROFILE
                  </button>
                </div>
              </div>
            </div>
            <button
              className={`${classes.Btn} ${
                this.state.account === 'default' ? classes.Disable : null
              }`}
            >
              DELETE YOUR ACCOUNT
            </button>
          </div>
        </div>
      </div>
    );
  }
}
