import Breadcrumb from '../components/Breadcrumb';
import ChatCard from '../components/ChatCard.js';
import DefaultLayout from '../layout/DefaultLayout';

const Students = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Students" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        { <ChatCard /> }
      </div>
    </DefaultLayout>
  );
};

export default Students;
