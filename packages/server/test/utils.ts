import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

export interface MockProviderProps {
  val?: any;
  provide?: any;
  model?: { name: string };
}

type MockProviderUnion = 'provide' | 'model';

export const useMock = (
  props: MockProviderProps,
): Provider<MockProviderUnion> => ({
  provide: props.model ? getModelToken(props.model.name) : props.provide,
  useValue: props.val ? props.val : {},
});
