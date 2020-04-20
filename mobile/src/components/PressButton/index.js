import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { Button, ContentButton, bgFill, TextError } from './styles';

const ACTION_TIMER = 3000;
const COLORS = ['#7D40E7', '#F0EFEF'];

export default function PressButton({ children, onLongPress }) {
  const [pressAction] = useState(new Animated.Value(0));
  const [buttonWidth, setButtonWidth] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [error, setError] = useState(false);

  let _value = 0;

  useEffect(() => {
    _value = 0;
    pressAction.addListener((v) => {
      _value = v.value;
    });
  }, []);

  const animationActionComplete = useCallback(() => {
    if (_value === 1) {
      onLongPress();
    }
  }, [_value]);

  const handlePressIn = useCallback(() => {
    setError(true);
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
    }).start(animationActionComplete);
  }, [animationActionComplete, pressAction]);

  const handlePressOut = useCallback(() => {
    Animated.timing(pressAction, {
      duration: 400,
      toValue: 0,
    }).start();
  }, [pressAction]);

  const getButtonWidthLayout = useCallback((e) => {
    setButtonWidth(e.nativeEvent.layout.width - 6);
    setButtonHeight(e.nativeEvent.layout.height - 6);
  }, []);

  const getProgressStyles = useCallback(() => {
    const width = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, buttonWidth],
    });
    const bgColor = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    return {
      width,
      height: buttonHeight,
      backgroundColor: bgColor,
    };
  }, [pressAction, buttonHeight, buttonWidth]);

  return (
    <>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Button onLayout={getButtonWidthLayout}>
          <Animated.View style={[bgFill, getProgressStyles()]} />
          <ContentButton>
            {error ? (
              <TextError>Mantenha pressionado durante 3 segundos</TextError>
            ) : null}
            {children}
          </ContentButton>
        </Button>
      </TouchableWithoutFeedback>
    </>
  );
}

PressButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onLongPress: PropTypes.func.isRequired,
};
