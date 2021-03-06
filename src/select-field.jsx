let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let TextField = require('./text-field');
let DropDownMenu = require('./drop-down-menu');


let SelectField = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    selectFieldRoot: React.PropTypes.string,
    underlineStyle: React.PropTypes.string,
    labelStyle: React.PropTypes.string,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
    rows: React.PropTypes.number,
    inputStyle: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    floatingLabelStyle: React.PropTypes.object,
    autoWidth: React.PropTypes.bool,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps() {
    return {};
  },

  getStyles() {
    let styles = {
      root: {
        height:'46px',
        position:'relative',
        width:'100%',
        top: '16px'
      },
      label: {
        paddingLeft:0,
        top:4,
        width:'100%'
      },
      icon: {
        top:20,
        right:0
      },
      underline: {
        borderTop:'none'
      },
      input: {}
    };
    if(this.props.hintText && !this.props.floatingLabelText) {
      styles.root.top = '-5px';
      styles.label.top = '1px';
      styles.icon.top = '17px';
    }
    if(!this.props.hintText && !this.props.floatingLabelText) {
      styles.root.top = '-8px';
    }
    return styles;
  },

  onChange(e, index, payload) {
    if (payload) {
      e.target.value = payload[this.props.valueMember] || payload;
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },

  render() {
    let styles = this.getStyles();
    let {
      style,
      labelStyle,
      iconStyle,
      underlineStyle,
      selectFieldRoot,
      onChange,
      menuItems,
      disabled,
      floatingLabelText,
      hintText,
      ...other
    } = this.props;

    let textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: (!hintText && !floatingLabelText) ? ' ' : hintText
    };
    let dropDownMenuProps = {
      onChange: this.onChange,
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline),
      autoWidth: false
    };

    return (
      <TextField {...textFieldProps}>
        <DropDownMenu {...dropDownMenuProps} {...other} />
      </TextField>
    );
  }
});

module.exports = SelectField;
