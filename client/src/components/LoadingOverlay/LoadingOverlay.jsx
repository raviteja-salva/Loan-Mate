import React from 'react';
import { ClipLoader, PulseLoader, BeatLoader, RingLoader } from 'react-spinners';
import {LoaderWrapper , LoaderContainer, LoadingText} from './LoadingOverlay.Style';

const spinnerTypes = {
  clip: ClipLoader,
  pulse: PulseLoader,
  beat: BeatLoader,
  ring: RingLoader,
};

const LoadingOverlay = ({
  text = 'Loading...',
  color = '#3b82f6',
  size = 40,
  type = 'clip',
  speedMultiplier = 1,
}) => {
  const SpinnerComponent = spinnerTypes[type] || spinnerTypes.clip;

  return (
    <LoaderWrapper>
      <LoaderContainer>
        <SpinnerComponent
          color={color}
          size={size}
          speedMultiplier={speedMultiplier}
          loading={true}
        />
        {text && <LoadingText>{text}</LoadingText>}
      </LoaderContainer>
    </LoaderWrapper>
  );
};

export default LoadingOverlay;
