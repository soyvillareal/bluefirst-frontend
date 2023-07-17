import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  autoComplete?: string;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
}

const Form = <T extends FieldValues>({
  autoComplete = 'on',
  onSubmit,
  methods,
  children,
}: React.PropsWithChildren<FormProps<T>>) => {
  return (
    <FormProvider {...methods}>
      <form
        autoComplete={autoComplete}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
