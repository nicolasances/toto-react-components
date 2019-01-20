import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import theme from '../theme/ThemeColors';

/*+
 * Displays a button as a circle with an icon inside
 * Requires:
 * - onPress        : function called when the button is pressed
 * - secondary      : true if the button should be a secondary button
 * - image          : the image to use
 * - size           : (optional, default: 'm') can be 'xxl', 'xl', 'l', 'm', 's', 'xs'
 * - label          : (optional, default: none) shows a label
 */
export default class TotoIconButton extends Component {

  /*+
   * Constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render the component
   */
  render() {

    let containerSize = 48;
    let iconSize = 20;

    // Change the size based on the 'size' prop
    if (this.props.size == 'xxl') {
      containerSize = 120;
      iconSize = 54;
    }
    else if (this.props.size == 'xl') {
      containerSize = 72;
      iconSize = 38;
    }
    else if (this.props.size == 'l') {
      containerSize = 60;
      iconSize = 32;
    }
    else if (this.props.size == 's') {
      containerSize = 24;
      iconSize = 12;
    }
    else if (this.props.size == 'xs') {
      containerSize = 20;
      iconSize = 10;
    }

    // Define the sizeStyles
    let containerSizeStyle = {width: containerSize, height: containerSize, borderRadius: containerSize / 2};
    let iconSizeStyle = {width: iconSize, height: iconSize};

    // Define the label component if any
    let label;

    if (this.props.label) {

      // Define the size of the label based on the size of the button
      let labelFontSize = 10;
      if (this.props.size == 'xxl') labelFontSize = 14;

      // Define the margin from the top based on the size of the button
      let labelMarginTop = 6;
      if (this.props.size == 'xxl') labelMarginTop = 12;

      label = (<Text style={{styles.label, fontSize: labelFontSize, marginTop: labelMarginTop}}>{this.props.label}</Text>)
    }

    return (

      <View style={{alignItems: 'center', marginHorizontal: 6}}>
        <TouchableOpacity style={[styles.container, containerSizeStyle]} onPress={this.props.onPress}>
          <Image style={[styles.image, iconSizeStyle]} source={this.props.image} />
        </TouchableOpacity>
        {label}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: theme.theme.COLOR_ACCENT,
  },
  image: {
    tintColor: theme.theme.COLOR_ACCENT,
    alignItems: 'center',
  },
  label: {
    color: theme.theme.COLOR_ACCENT,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
});
