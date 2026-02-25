import React, { Suspense } from 'react'
import ConfirmClient from './_components/ConfirmClient'

export default function page() {
  return (
    <Suspense>
      <ConfirmClient />
    </Suspense>
  )
}
