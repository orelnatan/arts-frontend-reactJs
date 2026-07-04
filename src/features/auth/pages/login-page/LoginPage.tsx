import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'

import { useAuthContext, useToken, useUser } from '@arts/core'
import { Caption, LinkAnchor } from '@arts/shared/components'
import { logo } from '@arts/assets/images'
import { PageLayout } from '@arts/libs/layout'
import { errorAlert } from '@arts/libs/alerts'
import {
  FormField,
  FormRow,
  InputCheckbox,
  InputPassword,
  InputText,
  PrimaryButton,
  Space,
} from '@arts/libs/form-utils'

import { useLogin } from '../../hooks'
import type { LoginFormValues } from '../../models'
import { VALIDATION_SCHEMA } from './validation-schema.const'

import './LoginPage.scss'

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false)
  const { login, loading: loginLoading } = useLogin()
  const { getUser, loading: userLoading } = useUser()
  const { setUser } = useAuthContext()
  const { setToken } = useToken()
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    validateInputOnChange: true,
    initialValues: {
      username: '',
      email: 'annklein@cormoran.com', //'gravesoneal@quordate.com',
      password: '',
      rememberMe: false,
    },
    validate: VALIDATION_SCHEMA,
  })

  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      const loginData = await login(values)
      setToken(loginData.token)

      const userData = await getUser()
      setUser(userData)

      navigate('/home')
    } catch (err) {
      errorAlert({
        title: (
          <Caption namespace="auth" keyPrefix="login-page">
            login-attempt-failed
          </Caption>
        ),
        message: (err as Error).message,
      })
    }
  }

  return (
    <PageLayout>
      <div className="login-page-main">
        <img src={logo} alt="logo" width={185} />

        <div className="login-form-container">
          <form
            onSubmit={form.onSubmit((values) => {
              handleSubmit(values)
            })}
          >
            <FormRow marginTopSize={Space.Sm}>
              <FormField>
                <InputText
                  namespace="auth"
                  keyPrefix="login-page"
                  placeholder="username"
                  value={form.values.username}
                  error={submitted ? form.errors.username : null}
                  onChange={(event) => {
                    form.setFieldValue('username', event)
                  }}
                />
              </FormField>
            </FormRow>

            <FormRow marginTopSize={Space.Md}>
              <FormField>
                <InputText
                  namespace="auth"
                  keyPrefix="login-page"
                  placeholder="email"
                  value={form.values.email}
                  error={submitted ? form.errors.email : null}
                  onChange={(event) => {
                    form.setFieldValue('email', event)
                  }}
                />
              </FormField>
            </FormRow>

            <FormRow marginTopSize={Space.Md}>
              <FormField>
                <InputPassword
                  namespace="auth"
                  keyPrefix="login-page"
                  placeholder="password"
                  value={form.values.password}
                  error={submitted ? form.errors.password : null}
                  onChange={(event) => {
                    form.setFieldValue('password', event)
                  }}
                />
              </FormField>
            </FormRow>

            <FormRow marginTopSize={Space.Md} spaceBetween>
              <FormField marginTopSize={Space.Xsm}>
                <InputCheckbox
                  namespace="auth"
                  keyPrefix="login-page"
                  label="remember-me"
                  checked={form.values.rememberMe}
                  error={submitted ? form.errors.rememberMe : null}
                  onChange={(event) => {
                    form.setFieldValue('rememberMe', event)
                  }}
                />
              </FormField>

              <FormField widthPx={145}>
                <PrimaryButton
                  namespace="auth"
                  keyPrefix="login-page"
                  label="submit"
                  loading={loginLoading || userLoading}
                  onClick={() => setSubmitted(true)}
                />
              </FormField>
            </FormRow>
          </form>

          <LinkAnchor to="/auth/registration" size="sm">
            <Caption namespace="auth" keyPrefix="login-page">
              register-now
            </Caption>
          </LinkAnchor>
        </div>
      </div>
    </PageLayout>
  )
}
