import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout'
import ChatCard from '../components/ChatCard'

const teacher = () => {
    return (
        <div>
            <DefaultLayout>
            <Breadcrumb pageName="Teachers" />
                <ChatCard />
            </DefaultLayout>
        </div>
    )
}

export default teacher
