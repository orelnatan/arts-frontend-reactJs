import { useState } from 'react';
import { useForm } from '@mantine/form';

import { PageLayout } from '@arts/libs/layout';
import { FormField, FormRow, InputPassword, InputText, Space } from '@arts/libs/form-utils';

import type { LoginFormValues } from '../../models';
import { VALIDATION_SCHEMA } from './validation-schema.const';
import './Login.scss';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<LoginFormValues>({
    validateInputOnChange: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: VALIDATION_SCHEMA,
  });

  function handleSubmit(values: LoginFormValues) {
    console.log("Success!", values);
  };

  return (
    <PageLayout>
      <div className='login-page-main'>
        <form 
          className='login-form' 
          onSubmit={form.onSubmit(
            (values) => {handleSubmit(values)})}
        >
          <FormRow marginTopSize={Space.Sm}>
            <FormField>
              <InputText
                placeholder='User Name'
                value={form.values.username}
                error={submitted ? form.errors.username : null}
                onChange={event => {
                  form.setFieldValue('username', event);
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Md}>
            <FormField>
              <InputText
                placeholder='Email'
                value={form.values.email}
                error={submitted ? form.errors.email : null}
                onChange={event => {
                  form.setFieldValue('email', event);
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Md}>
            <FormField>
              <InputPassword
                placeholder='Password'
                value={form.values.password}
                error={submitted ? form.errors.password : null}
                onChange={event => {
                  form.setFieldValue('password', event);
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Md} contentEnd>
            <FormField widthPx={85}>
              <button type="submit" onClick={() => setSubmitted(true)}>
                Submit</button>
            </FormField>
          </FormRow>
        </form>
      </div>
    </PageLayout>
  );
}
