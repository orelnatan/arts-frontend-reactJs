import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Anchor } from '@mantine/core';

import logo from '@arts/assets/images/png/arts-logo.png';
import { FormField, FormRow, InputCheckbox, InputPassword, InputText, PrimaryButton, Space } from '@arts/libs/form-utils';
import { PageLayout } from '@arts/libs/layout';

import { VALIDATION_SCHEMA } from './validation-schema.const';
import { useLogin } from '../../hooks';
import type { LoginFormValues } from '../../models';

import './Login.scss';

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const { login, loading, error } = useLogin();
  
  const form = useForm<LoginFormValues>({
    validateInputOnChange: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      rememberMe: false
    },
    validate: VALIDATION_SCHEMA,
  });

  function handleSubmit(values: LoginFormValues): void {
    login(values).then((data) => {
      console.log('Login success!', data);
    })
    .catch(() => {
      console.log('Login failed, error handled by hook, ', error);
    });
  };

  return (
    <PageLayout>
      <div className='login-page-main'>
        <img src={logo} alt="logo" width={185} />

        <div className='login-form-container'>
          <form 
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

            <FormRow marginTopSize={Space.Md} spaceBetween>
              <FormField marginTopSize={Space.Xsm}>
                <InputCheckbox 
                  label='Remember Me'
                  checked={form.values.rememberMe}
                  error={submitted ? form.errors.rememberMe : null}
                  onChange={event => {
                    form.setFieldValue('rememberMe', event);
                  }}
                />
              </FormField>

              <FormField widthPx={85}>
                <PrimaryButton label='Submit' loading={loading} onClick={() => setSubmitted(true)} />
              </FormField>
            </FormRow>
          </form>

          <Anchor component={Link} to="/auth/registration" size="sm">
            <span className='font-size-12 assistant-bold'>
              Don't have an account yet? Register now!</span> 
          </Anchor>
        </div>
      </div>
    </PageLayout>
  );
}
