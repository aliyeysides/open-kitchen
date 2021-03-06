import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step, { StepProps } from '@mui/material/Step';
import StepLabel, { StepLabelProps } from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SxProps } from '@mui/system';

type StepTuple = [string, JSX.Element][];

interface HorizontalLinearStepperProps {
  steps: StepTuple;
  handleFinish: () => void;
  sx?: SxProps;
}

export default function HorizontalLinearStepper({
  steps,
  handleFinish,
  sx,
}: HorizontalLinearStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const defaultStyle = { width: 'auto', mx: 20 };

  const isStepOptional = (step: number) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isLastStep = (step: number) => {
    return step === steps.length - 1;
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={sx ? sx : { ...defaultStyle }}>
      <Stepper sx={{ marginBottom: '50px' }} activeStep={activeStep}>
        {steps.map(([label, el], index) => {
          const stepProps: StepProps = {};
          const labelProps: StepLabelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Recipe Uploaded - view it here ...
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: 'auto' }}
          >
            {steps[activeStep][1]}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}

            {isLastStep(activeStep) ? (
              <Button onClick={handleFinish}>Create Recipe</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
