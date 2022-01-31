import { SyntheticEvent, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { RecipeStep as RS } from '../../types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';

type RecipeStep = Omit<RS, 'order'> & { key: number };
type EventHandler = (step: RecipeStep, e: SyntheticEvent) => void;

interface RecipeNameInputProps {
  value?: string;
  onChange: (e: SyntheticEvent) => void;
}

function RecipeNameInput({ value, onChange }: RecipeNameInputProps) {
  return (
    <TextField
      id="recipe-name"
      label="Recipe Name"
      name="name"
      onChange={onChange}
      value={value}
      required
    />
  );
}

interface RecipeStepsTableProps {
  steps: RecipeStep[];
  onDelete: EventHandler;
  onEdit: EventHandler;
}

function RecipeStepsTable({ steps, onDelete, onEdit }: RecipeStepsTableProps) {
  const [currentlyEditing, setCurrentlyEditting] = useState<number>();

  const toggleEditMode = (step: RecipeStep) => {
    if (currentlyEditing === step.key) {
      setCurrentlyEditting(0);
      return;
    }
    setCurrentlyEditting(step.key);
  };

  return (
    <>
      {steps.map((step, idx) => {
        return (
          <RecipeStepItem
            key={step.key}
            step={step}
            index={idx}
            editMode={currentlyEditing === step.key}
            onEdit={onEdit}
            render={(step: RecipeStep) => (
              <RecipeStepItemControls
                step={step}
                onDelete={onDelete}
                onEdit={() => toggleEditMode(step)}
                editMode={currentlyEditing === step.key}
              />
            )}
          />
        );
      })}
    </>
  );
}

interface RecipeStepItemProps {
  index: number;
  step: RecipeStep;
  editMode: boolean;
  onEdit: EventHandler;
  render: (step: RecipeStep) => void;
}

function RecipeStepItem({
  step,
  index,
  editMode,
  onEdit,
  render,
}: RecipeStepItemProps) {
  const [showControls, setShowControls] = useState<boolean>(false);
  const handleHover = () => setShowControls(!showControls);
  const editModeEl = (
    <TextField
      sx={{ width: '100%' }}
      key={step.key}
      defaultValue={step.instruction}
      onChange={(e) => onEdit(step, e)}
    />
  );

  return (
    <Box
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid teal',
        borderRadius: '4px',
        padding: '14px',
        cursor: 'pointer',
        height: '70px',
      }}
    >
      {editMode ? editModeEl : `${index + 1}: ${step.instruction}`}
      {showControls ? render(step) : null}
    </Box>
  );
}

interface RecipeStepItemControlsProps {
  onDelete: EventHandler;
  onEdit: EventHandler;
  step: RecipeStep;
  editMode: boolean;
}

export function RecipeStepItemControls({
  step,
  onDelete,
  onEdit,
  editMode,
}: RecipeStepItemControlsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: '60px',
        justifyContent: 'space-between',
      }}
    >
      {editMode ? (
        <>
          <IconButton onClick={(e) => onEdit(step, e)}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={(e) => onDelete(step, e)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={(e) => onEdit(step, e)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={(e) => onDelete(step, e)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}

function stepAttr(order: number) {
  return {
    id: `recipe-step-${order}`,
    label: `step ${order}`,
    placeholder: 'Chop the onions...',
    variant: 'outlined' as 'outlined',
    name: `newInputValue`,
    key: `${order}`,
    rows: 4,
    multiline: true,
    required: true,
  };
}

interface AddRecipeStepControlsProps {
  steps: RecipeStep[];
  value: string;
  onChange: (e: SyntheticEvent) => void;
  onClick: () => void;
}

function AddRecipeStepControls({
  steps,
  value,
  onChange,
  onClick,
}: AddRecipeStepControlsProps) {
  return (
    <>
      <TextField
        {...stepAttr(steps.length + 1)}
        onChange={onChange}
        value={value}
      />
      <AddRecipeStepButton onClick={onClick} />
    </>
  );
}

interface AddRecipeStepButtonProps {
  onClick: () => void;
}

function AddRecipeStepButton({ onClick }: AddRecipeStepButtonProps) {
  return (
    <Button onClick={onClick} variant="contained">
      Add Step
    </Button>
  );
}

export interface AddRecipeDetailsFormProps {
  name: string;
  newInputValue: string;
  steps: RecipeStep[];
  onChange: (e: SyntheticEvent) => void;
  onClick: () => void;
  onDelete: EventHandler;
  onEdit: EventHandler;
}

export default function AddRecipeDetailsForm({
  name,
  newInputValue,
  steps,
  onChange,
  onClick,
  onDelete,
  onEdit,
}: AddRecipeDetailsFormProps) {
  return (
    <Stack spacing={2}>
      <RecipeNameInput value={name} onChange={onChange} />
      <RecipeStepsTable steps={steps} onDelete={onDelete} onEdit={onEdit} />
      <AddRecipeStepControls
        steps={steps}
        onChange={onChange}
        onClick={onClick}
        value={newInputValue}
      />
    </Stack>
  );
}
