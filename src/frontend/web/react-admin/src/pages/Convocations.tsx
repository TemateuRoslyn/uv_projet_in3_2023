import React from 'react'
import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout'
import ChatCard from '../components/ChatCard'

const Convocations = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Convocations" />
      <ChatCard/>
    </DefaultLayout>
  )
}

export default Convocations
