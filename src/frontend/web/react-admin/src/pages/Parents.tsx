import Breadcrumb from '../components/Breadcrumb';
import ChatCard from '../components/ChatCard.js';
import DefaultLayout from '../layout/DefaultLayout';

const Parents = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Parents" />
      <div className="mt-4 md:mt-3 md:gap-3">
        { <ChatCard /> }
      </div>
    </DefaultLayout>
  );
};

export default Parents;