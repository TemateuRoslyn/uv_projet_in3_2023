import Breadcrumb from '../components/Breadcrumb';
import ChatCard from '../components/ChatCard'
import DefaultLayout from '../layout/DefaultLayout'

const Cours = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cours" />
      <ChatCard />
    </DefaultLayout>
  )
}

export default Cours
