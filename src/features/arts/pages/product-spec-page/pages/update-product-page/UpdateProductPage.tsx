import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from '@mantine/form'

import { PageLayout } from '@arts/libs/layout'
import {
  FormField,
  FormRow,
  InputText,
  InputTextarea,
  PrimaryButton,
  Space,
} from '@arts/libs/form-utils'

import type { ProductSpecOutletContext } from '../../product-spec-outlet-context.interface'
import type { ProductFormValues } from './product-form-values.interface'
import { VALIDATION_SCHEMA } from './validation-schema.const'

import './UpdateProductPage.scss'

export default function UpdateProductPage() {
  const [submitted, setSubmitted] = useState(false)
  const context = useOutletContext<ProductSpecOutletContext>()

  const product = context?.product

  const form = useForm<ProductFormValues>({
    validateInputOnChange: true,
    initialValues: {
      image: '',
      name: '',
      description: '',
      height: '',
      width: '',
      weight: '',
      added: '',
      price: '',
      familyId: 0,
    },
    validate: VALIDATION_SCHEMA,
  })

  useEffect(() => {
    if (product) {
      form.setValues({
        image: product.image ?? '',
        name: product.name ?? '',
        description: product.description ?? '',
        height: product.height ?? '',
        width: product.width ?? '',
        weight: product.weight ?? '',
        added: product.added ?? '',
        price: product.price ?? '',
        familyId: product.familyId ?? 0,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleSubmit = async (values: ProductFormValues): Promise<void> => {
    console.log(values)
  }

  return (
    <PageLayout key="update-product-page-layout" fullHeight noPadding>
      <div className="update-product-page-main">
        <form>
          <FormRow>
            <FormField>
              <InputText
                namespace="arts"
                keyPrefix="update-product-page"
                label="name"
                placeholder="name"
                value={form.values.name}
                error={submitted ? form.errors.name : null}
                onChange={(event) => {
                  form.setFieldValue('name', event)
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Sm}>
            <FormField>
              <InputTextarea
                namespace="arts"
                keyPrefix="update-product-page"
                label="description"
                rows={4}
                placeholder="description"
                value={form.values.description}
                error={submitted ? form.errors.description : null}
                onChange={(event) => {
                  form.setFieldValue('description', event)
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Lg}>
            <FormField>
              <InputText
                namespace="arts"
                keyPrefix="update-product-page"
                label="height"
                placeholder="height"
                value={form.values.height}
                error={submitted ? form.errors.height : null}
                onChange={(event) => {
                  form.setFieldValue('height', event)
                }}
              />
            </FormField>

            <FormField>
              <InputText
                namespace="arts"
                keyPrefix="update-product-page"
                label="width"
                placeholder="width"
                value={form.values.width}
                error={submitted ? form.errors.width : null}
                onChange={(event) => {
                  form.setFieldValue('width', event)
                }}
              />
            </FormField>

            <FormField>
              <InputText
                namespace="arts"
                keyPrefix="update-product-page"
                label="weight"
                placeholder="weight"
                value={form.values.weight}
                error={submitted ? form.errors.weight : null}
                onChange={(event) => {
                  form.setFieldValue('weight', event)
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Lg}>
            <FormField>
              <InputText
                disabled
                namespace="arts"
                keyPrefix="update-product-page"
                label="familyId"
                placeholder="familyId"
                value={form.values.familyId}
                error={submitted ? form.errors.familyId : null}
              />
            </FormField>

            <FormField>
              <InputText
                namespace="arts"
                keyPrefix="update-product-page"
                label="price"
                placeholder="price"
                value={form.values.price}
                error={submitted ? form.errors.price : null}
                onChange={(event) => {
                  form.setFieldValue('price', event)
                }}
              />
            </FormField>
          </FormRow>
        </form>

        <FormRow marginTopSize={Space.Lg}>
          <FormField>
            <PrimaryButton
              namespace="arts"
              keyPrefix="update-product-page"
              label="submit"
              justify="center"
              onClick={() => {
                setSubmitted(true)

                form.onSubmit(handleSubmit)()
              }}
            />
          </FormField>
        </FormRow>
      </div>
    </PageLayout>
  )
}
