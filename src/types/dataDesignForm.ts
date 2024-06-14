// app/types/dataDesignForm.ts
export interface DataDesignForm {
  label: string;
  order: number;
  isRequired: boolean;
  type: string;
  data_type: string;
  options: string[];
  operation: string;
}

interface DataType {
  name: string;
  type: string;
}

interface QuestionType {
  name: string;
  questionType: string;
  dataTypes: DataType[];
  operationFilter: string;
}

export const questionTypes: QuestionType[] = [
  {
    name: 'Short Answer',
    questionType: 'short_answer',
    operationFilter: 'string',
    dataTypes: [
      { type: 'string', name: 'Text' },
      { type: 'integer', name: 'Number' },
      { type: 'float', name: 'decimal' },
    ],
  },
  {
    name: 'Paragraph',
    questionType: 'paragraph',
    operationFilter: 'string',
    dataTypes: [{ type: 'string', name: 'Text' }],
  },
  {
    name: 'Multiple Choice',
    questionType: 'multiple_choice',
    operationFilter: 'array',
    dataTypes: [
      { type: 'string', name: 'Text' },
      { type: 'integer', name: 'Number' },
      { type: 'float', name: 'Decimal' },
    ],
  },
  {
    name: 'Dropdown',
    questionType: 'dropdown',
    operationFilter: 'array',
    dataTypes: [
      { type: 'string', name: 'Text' },
      { type: 'integer', name: 'Number' },
      { type: 'float', name: 'Decimal' },
    ],
  },
  {
    name: 'Checkboxes',
    questionType: 'checkboxes',
    operationFilter: 'array',
    dataTypes: [
      { type: 'string', name: 'Text' },
      { type: 'integer', name: 'Number' },
      { type: 'float', name: 'Decimal' },
    ],
  },
  {
    name: 'Date',
    questionType: 'date',
    operationFilter: 'date',
    dataTypes: [{ type: 'date', name: 'Date' }],
  },
  {
    name: 'Time',
    questionType: 'time',
    operationFilter: 'time',
    dataTypes: [{ type: 'time', name: 'Time' }],
  },
];
