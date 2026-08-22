import { OperationContent } from '../operation-types';
import { OperationKey } from '../../../types/operations';
import { getOperationsEnContent } from '../../operations-catalog';

export const operationsEn: Record<OperationKey, OperationContent> = getOperationsEnContent();
