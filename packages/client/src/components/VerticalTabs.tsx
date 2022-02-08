import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SyntheticEvent, useState } from 'react';
import { Recipe, RecipeStep } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Container maxWidth="sm">
            <Typography>{children}</Typography>
          </Container>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function renderStepTabs(steps: RecipeStep[]) {
  const handleClick = (step: RecipeStep, e: SyntheticEvent) => {
    console.log('clicked step:', step); // TODO: skip to assigned chapter withib video on click
  };
  return steps.map((step) => (
    <Tab
      onClick={(e) => handleClick(step, e)}
      label={`${step.order}`}
      key={`${step.order}`}
      {...a11yProps(step.order - 1)}
    />
  ));
}

interface StepTabPanelProps {
  value: number;
  index: number;
  key: string;
  step: RecipeStep;
}

function StepTabPanel({ value, index, step }: StepTabPanelProps) {
  return (
    <TabPanel value={value} index={index}>
      {step.instruction}
    </TabPanel>
  );
}

interface StepTabPanelsProps {
  steps: RecipeStep[];
  value: number;
}

function StepTabPanels({ steps, value }: StepTabPanelsProps) {
  return (
    <>
      {steps.map((step) => (
        <StepTabPanel
          step={step}
          value={value}
          index={step.order - 1}
          key={`${step.order}`}
        />
      ))}
    </>
  );
}

interface VerticalTabsProps {
  recipe: Recipe;
}

export default function VerticalTabs({ recipe }: VerticalTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 'auto',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Recipe Instructions"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          overflow: 'visible',
        }}
      >
        {renderStepTabs(recipe.steps)}
      </Tabs>
      <StepTabPanels value={value} steps={recipe.steps} />
    </Box>
  );
}
