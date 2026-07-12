import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from '@mantine/form'

import { PageLayout } from '@arts/libs/layout'
import { decimalFormatter } from '@arts/shared/utils'
import {
  FormField,
  FormRow,
  InputDate,
  InputNumber,
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
      height: 0,
      width: 0,
      weight: 0,
      added: '',
      price: 0,
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
        height: product.height ?? 0,
        width: product.width ?? 0,
        weight: product.weight ?? 0,
        added: product.added ?? '',
        price: product.price ?? 0,
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

            <FormField>
              <InputDate
                namespace="arts"
                keyPrefix="update-product-page"
                label="added"
                placeholder="added"
                value={form.values.added}
                error={submitted ? form.errors.added : null}
                onChange={(event) => {
                  form.setFieldValue('added', event)
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
              <InputNumber
                hideControls
                namespace="arts"
                keyPrefix="update-product-page"
                label="height"
                placeholder="height"
                value={decimalFormatter(form.values.height, {
                  decimalScale: 2,
                })}
                error={submitted ? form.errors.height : null}
                onChange={(event) => {
                  form.setFieldValue('height', event)
                }}
              />
            </FormField>

            <FormField>
              <InputNumber
                hideControls
                namespace="arts"
                keyPrefix="update-product-page"
                label="width"
                placeholder="width"
                value={decimalFormatter(form.values.width, { decimalScale: 2 })}
                error={submitted ? form.errors.width : null}
                onChange={(event) => {
                  form.setFieldValue('width', event)
                }}
              />
            </FormField>

            <FormField>
              <InputNumber
                hideControls
                namespace="arts"
                keyPrefix="update-product-page"
                label="weight"
                placeholder="weight"
                value={decimalFormatter(form.values.weight, {
                  decimalScale: 2,
                })}
                error={submitted ? form.errors.weight : null}
                onChange={(event) => {
                  form.setFieldValue('weight', event)
                }}
              />
            </FormField>
          </FormRow>

          <FormRow marginTopSize={Space.Lg}>
            <FormField>
              <InputNumber
                hideControls
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
              <InputNumber
                hideControls
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
              bottomCornerRadius
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
