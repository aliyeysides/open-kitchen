import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { Recipe, RecipeStep } from '../types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IngredientLineItem from './IngredientLineItem';
interface TabPanelProps {
  children: ReactNode;
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
          <Container maxWidth="sm">{children}</Container>
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

function renderStepTabs(steps: RecipeStep[], onClick: VerticalTabsOnClick) {
  return steps.map((step) => (
    <Tab
      onClick={(e) => onClick(step, e)}
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
    <TabPanel key={index} value={value} index={index}>
      <Typography>{step.instruction}</Typography>
      <List dense>
        <ListItem sx={{ display: 'block' }}>
          {step.ingredients &&
            step.ingredients.map((ing) => (
              <IngredientLineItem key={ing.name} ingredient={ing} />
            ))}
        </ListItem>
      </List>
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
          key={`step-tab-panel-${step.order}`}
        />
      ))}
    </>
  );
}

export type VerticalTabsOnClick = (step: RecipeStep, e: SyntheticEvent) => void;

interface VerticalTabsProps {
  recipe: Recipe;
  onClick: VerticalTabsOnClick;
}

export default function VerticalTabs({ recipe, onClick }: VerticalTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
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
        {renderStepTabs(recipe.steps, onClick)}
      </Tabs>
      <StepTabPanels value={value} steps={recipe.steps} />
    </Box>
  );
}
